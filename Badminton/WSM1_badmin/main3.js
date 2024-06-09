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

    // 네비게이션 토글
    navToggle.addEventListener('click', () => {
        navDropdown.style.display = 'flex';
    });

    navClose.addEventListener('click', () => {
        navDropdown.style.display = 'none';
    });

    // 지난 일기 보러가기 버튼
    scrollButton.addEventListener('click', () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    // 이미지 업로드 미리보기
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

    // 일기 저장
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

    // 일기 저장 및 로드
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
        `;
        diaryContainer.insertBefore(diaryItem, diaryContainer.firstChild);
    }

    function resetForm() {
        diaryDate.value = '';
        diaryText.value = '';
        imagePreview.src = '';
        imagePreview.style.display = 'none';
    }

    // 로드 시 일기 항목 불러오기
    loadDiaryEntries();
});
