        document.addEventListener("DOMContentLoaded", function () {
            // Fetch and insert navbar.html
            fetch("navbar.html")
                .then(response => response.text())
                .then(data => {
                    document.getElementById("navbarContainer").innerHTML = data;
                });
        });

async function fetchPapers() {
    try {
        const response = await fetch('papers.bib');
        if (!response.ok) {
            throw new Error('Failed to fetch papers');
        }
        const bibtexData = await response.text();

        // Assume the BibTeX data is in the variable 'bibtexData'
        const papers = [];

        // Split BibTeX data into individual entries
        const entries = bibtexData.split('@');
        entries.shift(); // Remove empty first element

        // Iterate over each BibTeX entry
        entries.forEach(entry => {
            // Extract relevant fields using a more robust parser
            const fields = entry.match(/(?:(?!\bauthor=)\w+={.*?}),?/g);

            // Create a paper object
            const paper = {};
            fields.forEach(field => {
                const [key, value] = field.split('=').map(str => str.trim());
                paper[key] = value.replace(/[\{\}]/g, ''); // Remove curly braces
            });

            // Add the paper to the array
            papers.push(paper);
        });

        // Display papers in the HTML
        const papersList = document.getElementById('papers-list');
        papers.forEach(paper => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>${paper.title}</strong><br>
                Authors: ${paper.author}<br>
                Journal: ${paper.journal}<br>
                Year: ${paper.year}<br>
                DOI: <a href="${paper.doi}" target="_blank">${paper.doi}</a>`;
            papersList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching papers:', error.message);
    }
}

// Fetch and display papers on page load
fetchPapers();
