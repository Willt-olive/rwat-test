function renderTableRows(data) {
    const tbody = document.querySelector("#data-table tbody");
    tbody.innerHTML = '';
    data.forEach(entry => {
        const row = `<tr><td>${entry.name}</td><td>${entry.surname}</td><td>${entry.id}</td></tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    });
    console.log("Data rendered in table:", data);
}

function processData(jsonData) {
    if (!jsonData.data) {
        console.log("No data found to process");
        return [];
    }
    console.log("Processing data:", jsonData);
    return jsonData.data.map(entry => {
        const [name, surname] = entry.name.split(" ");
        return { name, surname, id: entry.id };
    });
}

// XMLHttpRequest synchronous
function fetchDataSync() {
    let allData = [];
    try {
        // fetch reference.json
        const referenceFile = 'data/reference.json';
        const xhrRef = new XMLHttpRequest();
        xhrRef.open('GET', referenceFile, false); // synchronous
        xhrRef.send();

        if (xhrRef.status === 200) {
            const referenceData = JSON.parse(xhrRef.responseText);
            console.log(`Successfully fetched: ${referenceFile}`);

            // load data from reference data
            const dataFiles = [`data/${referenceData.data_location}`, 'data/data2.json', 'data/data3.json'];

            dataFiles.forEach(file => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', file, false); // synchronous
                xhr.send();
                if (xhr.status === 200) {
                    const jsonData = JSON.parse(xhr.responseText);
                    console.log(`Successfully fetched: ${file}`);
                    const processedData = processData(jsonData);
                    allData = allData.concat(processedData);
                } else {
                    console.error(`Failed to load ${file}: ${xhr.status}`);
                }
            });

            renderTableRows(allData);
        } else {
            console.error(`Failed to load ${referenceFile}: ${xhrRef.status}`);
        }
    } catch (error) {
        console.error("Error fetching data synchronously:", error);
    }
}

// XMLHttpRequest asynchronous
function fetchDataAsync() {
    let allData = [];
    const referenceFile = 'data/reference.json';
    
    const xhrRef = new XMLHttpRequest();
    xhrRef.open('GET', referenceFile, true); // asynchronous
    xhrRef.onload = function () {
        if (xhrRef.status === 200) {
            const referenceData = JSON.parse(xhrRef.responseText);
            console.log(`Successfully fetched: ${referenceFile}`);
            
            // load data from reference data
            const dataFiles = [`data/${referenceData.data_location}`, 'data/data2.json', 'data/data3.json'];

            // create function to fetch data jsons
            const fetchData = (fileIndex) => {
                if (fileIndex < dataFiles.length) {
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', dataFiles[fileIndex], true); // asynchronous
                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            const jsonData = JSON.parse(xhr.responseText);
                            console.log(`Successfully fetched: ${dataFiles[fileIndex]}`);
                            const processedData = processData(jsonData);
                            allData = allData.concat(processedData);
                            fetchData(fileIndex + 1); // fetch next file
                        } else {
                            console.error(`Failed to load ${dataFiles[fileIndex]}: ${xhr.status}`);
                        }
                    };
                    xhr.onerror = function () {
                        console.error(`Error fetching ${dataFiles[fileIndex]}`);
                    };
                    xhr.send();
                } else {
                    renderTableRows(allData); // show table after all data added
                }
            };

            fetchData(0); // fetch from the first file
        } else {
            console.error(`Failed to load ${referenceFile}: ${xhrRef.status}`);
        }
    };
    xhrRef.onerror = function () {
        console.error(`Error fetching ${referenceFile}`);
    };
    xhrRef.send();
}

// fetch ()) with Promises
function fetchDataPromise() {
    let allData = [];
    const referenceFile = 'data/reference.json';

    fetch(referenceFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${referenceFile}: ${response.status}`);
            }
            return response.json();
        })
        .then(referenceData => {
            console.log(`Successfully fetched: ${referenceFile}`);

            // load data from reference data
            const dataFiles = [`data/${referenceData.data_location}`, 'data/data2.json', 'data/data3.json'];
            const fetchPromises = dataFiles.map(file => {
                return fetch(file)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to load ${file}: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(jsonData => {
                        const processedData = processData(jsonData);
                        allData = allData.concat(processedData);
                    });
            });

            return Promise.all(fetchPromises);
        })
        .then(() => {
            renderTableRows(allData); // show table after all data is added
        })
        .catch(error => {
            console.error("Error fetching data using fetch API:", error);
        });
}
