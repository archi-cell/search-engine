document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const clearBtn = document.getElementById('clearBtn');
    const historyList = document.getElementById('historyList');
    const feedback = document.getElementById('feedback');

    // Load search history from localStorage
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Function to render search history with animation
    const renderHistory = () => {
        historyList.innerHTML = '';
        searchHistory.forEach((term, index) => {
            const li = document.createElement('li');
            li.textContent = term;
            li.classList.add('fade-in');  // Adding animation class
            historyList.appendChild(li);
        });
    };

    // Store search term in history
    const addSearchTerm = (term) => {
        searchHistory.push(term);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        renderHistory();
    };

    // Clear search history with confirmation
    const clearHistory = () => {
        if (confirm("Are you sure you want to clear the search history?")) {
            searchHistory = [];
            localStorage.removeItem('searchHistory');
            renderHistory();
        }
    };

    // Show real-time feedback on input
    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim() === '') {
            feedback.textContent = 'Type something to search...';
            feedback.classList.remove('hidden');
        } else {
            feedback.classList.add('hidden');
        }
    });

    // Event listeners for buttons
    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            addSearchTerm(searchTerm);
            searchInput.value = ''; // Clear the input field
        } else {
            feedback.textContent = 'Please enter a valid search term!';
            feedback.classList.remove('hidden');
        }
    });

    clearBtn.addEventListener('click', clearHistory);

    // Initial render of history
    renderHistory();
});
