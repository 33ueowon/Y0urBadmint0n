document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const navDropdown = document.getElementById('nav-dropdown');
    const navClose = document.getElementById('nav-close');
    const scrollButton = document.getElementById('scroll-button');
    const imageUploadInput = document.getElementById('image-upload-input');
    const imagePreview = document.getElementById('image-preview');
    const saveDiaryButton = document.getElementById('save-diary-button');
    const diaryContainer = document.getElementById('diary');
    const diaryDate = document.getElementById('diary-date');
    const diaryText = document.getElementById('diary-text');

    navToggle.addEventListener('click', () => {
        navDropdown.style.display = 'flex';
    });

    navClose.addEventListener('click', () => {
        navDropdown.style.display = 'none';
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    imageUploadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    saveDiaryButton.addEventListener('click', () => {
        const date = diaryDate.value;
        const text = diaryText.value;
        const imageSrc = imagePreview.src;

        if (date && text && imageSrc) {
            const diaryEntry = { date, text, imageSrc };
            saveDiaryEntry(diaryEntry);
            appendDiaryEntry(diaryEntry);
            resetForm();
            alert('일기가 저장되었습니다!');
        } else {
            alert('모든 항목을 입력해주세요.');
        }
    });

    function saveDiaryEntry(entry) {
        let diaryEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
        diaryEntries.push(entry);
        localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
    }

    function loadDiaryEntries() {
        const diaryEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
        diaryEntries.forEach(entry => appendDiaryEntry(entry));
    }

    function appendDiaryEntry(entry) {
        const diaryItem = document.createElement('div');
        diaryItem.className = 'diary-item';
        diaryItem.innerHTML = `
            <p>${entry.date}</p>
            <img src="${entry.imageSrc}" alt="일기 이미지">
            <p>한 줄 일기:<br>${entry.text}</p>
            <button class="edit-diary-button">수정</button>
            <button class="delete-diary-button">삭제</button>
        `;
        diaryContainer.insertBefore(diaryItem, diaryContainer.firstChild);
        addDiaryItemEventListeners(diaryItem);
    }

    function addDiaryItemEventListeners(diaryItem) {
        const editButton = diaryItem.querySelector('.edit-diary-button');
        const deleteButton = diaryItem.querySelector('.delete-diary-button');

        editButton.addEventListener('click', () => {
            const date = prompt('새로운 날짜를 입력하세요 (yyyy-mm-dd):', diaryItem.querySelector('p').textContent);
            const text = prompt('새로운 일기 내용을 입력하세요:', diaryItem.querySelector('p:nth-of-type(2)').textContent.split(':')[1].trim());
            const imageSrc = diaryItem.querySelector('img').src;

            if (date && text) {
                const updatedDiaryEntry = { date, text, imageSrc };
                updateDiaryEntry(diaryItem, updatedDiaryEntry);
            }
        });

        deleteButton.addEventListener('click', () => {
            if (confirm('정말로 이 일기를 삭제하시겠습니까?')) {
                deleteDiaryEntry(diaryItem);
            }
        });
    }

    function updateDiaryEntry(diaryItem, updatedEntry) {
        let diaryEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
        const index = Array.from(diaryContainer.children).indexOf(diaryItem);
        diaryEntries[index] = updatedEntry;
        localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
        diaryItem.querySelector('p').textContent = updatedEntry.date;
        diaryItem.querySelector('img').src = updatedEntry.imageSrc;
        diaryItem.querySelector('p:nth-of-type(2)').innerHTML = `한 줄 일기:<br>${updatedEntry.text}`;
    }

    function deleteDiaryEntry(diaryItem) {
        let diaryEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
        const index = Array.from(diaryContainer.children).indexOf(diaryItem);
        diaryEntries.splice(index, 1);
        localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
        diaryItem.remove();
    }

    function resetForm() {
        diaryDate.value = '';
        diaryText.value = '';
        imagePreview.src = '';
        imagePreview.style.display = 'none';
    }

    loadDiaryEntries();
});
