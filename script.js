 const form = document.getElementById('personForm');
        const tableBody = document.querySelector('#personTable tbody');

        let data = [];
        if (localStorage.getItem('hobbiesData')) {
            data = JSON.parse(localStorage.getItem('hobbiesData'));
        } else {
            data = [
                { hobby: 'Баскетбол', exp: '3 года', email: 'basket@gmail.com' },
                { hobby: 'Рыбалка', exp: '2 года', email: 'fishing@gmail.com' },
                { hobby: 'Компьютерные игры', exp: '11 лет', email: 'games@gmail.com' }
            ];
        }

        function renderTable() {
            tableBody.innerHTML = '';
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                const tr = document.createElement('tr');
                let rowHTML = '';
                rowHTML += '<td class="table-td">' + item.hobby + '</td>';
                rowHTML += '<td class="table-td">' + item.exp + '</td>';
                rowHTML += '<td class="table-td">' + item.email + '</td>';
                rowHTML += '<td class="table-td"><button class="delete-btn" onclick="deleteRow(' + i + ')">Удалить</button></td>';
                tr.innerHTML = rowHTML;
                tableBody.appendChild(tr);
            }
        }

        function saveData() {
            localStorage.setItem('hobbiesData', JSON.stringify(data));
        }

        function validateEmail(email) {
            if (email.indexOf('@') == -1) {
                return false;
            }
            
            if (email.indexOf('.') == -1 || email.lastIndexOf('.') <= email.indexOf('@')) {
                return false;
            }
            return true;
        }

        function validateForm() {
            const hobby = document.getElementById('hobby').value.trim();
            const exp = document.getElementById('exp').value.trim();
            const email = document.getElementById('email').value.trim();

            
            const inputs = ['hobby', 'exp', 'email'];
            for (let j = 0; j < inputs.length; j++) {
                document.getElementById(inputs[j]).style.borderColor = '';
                document.getElementById(inputs[j] + 'Error').innerHTML = '';
            }
            document.getElementById('formError').innerHTML = '';

            let valid = true;

            if (hobby === '') {
                valid = false;
                document.getElementById('hobby').style.borderColor = 'red';
                document.getElementById('hobbyError').innerHTML = 'Обязательное поле';
            }

            if (exp === '') {
                valid = false;
                document.getElementById('exp').style.borderColor = 'red';
                document.getElementById('expError').innerHTML = 'Обязательное поле';
            }

            if (email === '') {
                valid = false;
                document.getElementById('email').style.borderColor = 'red';
                document.getElementById('emailError').innerHTML = 'Обязательное поле';
            } else if (!validateEmail(email)) {
                valid = false;
                document.getElementById('email').style.borderColor = 'red';
                document.getElementById('emailError').innerHTML = 'Нужен @ и домен (.com, .ru)';
            }

            return valid;
        }

        form.onsubmit = function(event) {
            event.preventDefault();
            if (!validateForm()) {
                return false;
            }
            const newItem = {
                hobby: document.getElementById('hobby').value.trim(),
                exp: document.getElementById('exp').value.trim(),
                email: document.getElementById('email').value.trim()
            };
            data.push(newItem);
            saveData();
            renderTable();
            form.reset();
            return false;
        };

        window.deleteRow = function(index) {
            data.splice(index, 1);
            saveData();
            renderTable();
        };

        
        const slides = document.getElementById('slides');
        const totalSlides = slides.children.length;
        let currentIndex = 0;

        function updateSlider() {
            slides.style.transform = 'translateX(' + (-currentIndex * 100) + '%)';
           
            for (let i = 0; i < totalSlides; i++) {
                slides.children[i].classList.remove('active');
            }
            
            slides.children[currentIndex].classList.add('active');
        }

        document.getElementById('prevBtn').onclick = function() {
            if (currentIndex == 0) {
                currentIndex = totalSlides - 1;
            } else {
                currentIndex--;
            }
            updateSlider();
        };

        document.getElementById('nextBtn').onclick = function() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        };

        setInterval(function() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }, 5000);

       
        renderTable();
        updateSlider();
