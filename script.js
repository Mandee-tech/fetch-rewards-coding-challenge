async function fetchData() {
    try {
        const response = await fetch('./hiring.json');
        const data = await response.json ();
        
        // Filter out items with blank or null name
        const filteredData = data.filter(item => item.name && item.name.trim() !== '');

        // Sort by listedId then by name
        filteredData.sort((a, b) => {
            if( a.listId === b.listId) {
                return a.name.localeCompare(b.name);
            }
            return a.list-b.list;
        });

        // Grouped By listedId
        const groupedData = {};
        filteredData.forEach(item => {
            if (!groupedData[item.listId]) {
                groupedData[item.listId] = [];
            }
            groupedData[item.listId].push(item.name);
        });
        displayData(groupedData);
    } catch (err){
        console.error('Fetch error:', err);
    }
}
function displayData(groupedData) {
    const output = document.getElementById('output');
    for (const listId in groupedData) {
        const section = document.createElement('div');
        section.className = 'card';
        section.innerHTML = `<h2>List ID: ${listId}</h2><ul>${groupedData[listId].map(name => `<li>${name}</li> `) .join('')}</ul>`;
        output.appendChild(section);
    }
    
}
fetchData();
    
