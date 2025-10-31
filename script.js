// Получаем элементы
const confirmBtn = document.getElementById('confirm-btn');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');
const form = document.getElementById('invitation-form');
const successMessage = document.getElementById('success-message');

// Открытие модального окна
confirmBtn.addEventListener('click', function() {
    modal.style.display = 'block';
});

// Закрытие модального окна
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Закрытие при клике вне окна
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Обработка отправки формы
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    
    // Получаем данные из формы
    const formData = {
        childName: document.getElementById('child-name').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toLocaleString('ru-RU')
    };
    
    // Отправляем данные (выберите один из вариантов ниже)
    sendToTelegram(formData);
    // ИЛИ
    // sendToEmail(formData);
    
    // Закрываем модальное окно и показываем сообщение об успехе
    modal.style.display = 'none';
    successMessage.style.display = 'block';
    
    // Очищаем форму
    form.reset();
    
    // Прячем сообщение через 5 секунд
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
});

// Вариант 1: Отправка в Telegram (РЕКОМЕНДУЮ этот способ - проще и мгновенно)
function sendToTelegram(data) {
    const botToken = '8188627515:AAHT1JhyVR2oE9a0o_1GTe9zT8tnRBo6R0c'; // Замените на токен вашего бота
    const chatId = '819491819';     // Замените на ваш chat_id
    
    const text = `🎉 НОВОЕ ПОДТВЕРЖДЕНИЕ НА ДР!
    
👶 Ребенок: ${data.childName}
💬 Сообщение: ${data.message || 'нет'}
⏰ Отправлено: ${data.timestamp}`;

    // Отправляем сообщение в Telegram
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'HTML'
        })
    }).catch(error => {
        console.error('Ошибка отправки в Telegram:', error);
    });
}
