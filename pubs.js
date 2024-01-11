document.addEventListener("DOMContentLoaded", function () {
    // Replace 'Author Name' with the desired author's name
    const authorName = 'Vahid Attari';

    // Function to fetch papers from Google Scholar
    async function fetchPapers(authorName) {
        const response = await fetch(`https://api.scholarcy.com/v1/authors?name=${authorName}`);
        const data = await response.json();
        return data.papers;
    }

    // Function to display papers in the gallery
    async function displayPapers() {
        const papersGallery = document.getElementById('papersGallery');

        try {
            const papers = await fetchPapers(authorName);

            papers.forEach((paper) => {
                const paperCard = `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <img src="${paper.thumbnail}" class="card-img-top" alt="Paper Thumbnail">
                            <div class="card-body">
                                <h5 class="card-title">${paper.title}</h5>
                                <p class="card-text">${paper.authors.join(', ')}</p>
                                <a href="${paper.url}" class="btn btn-primary" target="_blank">Read Paper</a>
                            </div>
                        </div>
                    </div>
                `;

                papersGallery.innerHTML += paperCard;
            });
        } catch (error) {
            console.error('Error fetching papers:', error);
        }
    }

    // Call the function to display papers
    displayPapers();
});
