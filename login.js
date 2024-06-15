document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('로그인 성공!');
            // 로그인 성공 시 원하는 페이지로 이동
        } else {
            alert('로그인 실패. 아이디와 비밀번호를 확인해주세요.');
        }
    })
    .catch(error => {
        console.error('에러:', error);
    });
});