# Al.lab — Односторінковий сайт для салону краси

Простий сучасний адаптивний лендинг для салону краси Al.lab (Кам'янець-Подільський).

Файли, що додані:

- [index.html](index.html)
- [css/styles.css](css/styles.css)
- [js/script.js](js/script.js)

Логотип:
Логотип та фото (assets):

- Помістіть файли у папку `assets` у корені проєкту. Імена файлів мають бути такими (або змініть шляхи в `index.html` відповідно):

	- `logo.png` (логотип — використовується в шапці та як favicon)
	- `hero.jpg` (фонове зображення у Hero-секції)
	- `work1.jpg`, `work2.jpg`, `work3.jpg`, `work4.jpg` (фотографії для галереї)

Приклад: скопіюйте файли у:

```
C:\Users\Роман\Desktop\ai-lab.itkamianets.com\assets\logo.png
C:\Users\Роман\Desktop\ai-lab.itkamianets.com\assets\hero.jpg
C:\Users\Роман\Desktop\ai-lab.itkamianets.com\assets\work1.jpg
C:\Users\Роман\Desktop\ai-lab.itkamianets.com\assets\work2.jpg
C:\Users\Роман\Desktop\ai-lab.itkamianets.com\assets\work3.jpg
C:\Users\Роман\Desktop\ai-lab.itkamianets.com\assets\work4.jpg
```

Запуск локально:

1. Відкрийте `index.html` у браузері або запустіть простий HTTP-сервер, наприклад:

```powershell
# у Windows (PowerShell) у папці проєкту
Start-Process "index.html"

# або з Python 3
python -m http.server 8000
```

Особливості:

- Секції: Hero, Про нас, Послуги, Галерея, Відгуки, Ціни, Контакти
- Мобільна адаптація, плавний скрол, лайтбокс для галереї
- Форма запису (демо): замість бекенду треба підключити API/CRM або webhook

Далі можу:

- Підключити форму до Google Sheets / Zapier / CRM
- Замінити фото на реальні з Instagram (через API або вручну)
- Згенерувати Favicon та оптимізувати зображення
