const TITLES = {
    q1: "최저에 반영하고 싶은 과목을 선택해주세요.",
    q2: "수리 논술을 보는 대학에 지원할까요?",
    q3: "학생부교과(내신)을 반영하는 대학에 지원할까요?",
    q4: "출결을 반영하는 대학에 지원할까요?",
    q5: "개인 논술 스타일에 맞는 대학을 추천 받으시겠습니까?",
    q6: "딱 맞는 대학을 찾았어요. 이제 원하는 대학을 선택하면 일정과 위치에 따라 지원 가능 대학이 변경돼요"
};

const QUESTIONS = {
    q1: ["국어", "수학", "영어", "한국사", "탐구1", "탐구2"],
    q2: ["예", "아니요", "상관없어요!"],
    q3: ["예", "아니요", "상관없어요!"],
    q4: ["예", "아니요", "상관없어요!"],
    q5: ["예", "아니요"],
};

const selected = `
<div class="flex items-center" style="color: #7E22CE;">
<button class="flex items-center w-1/3">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
    </svg>
<span class="font-bold text-xl text-[18px]">Home</span>
</button>
<h1 style="color: #7E22CE;" class="font-weight: 700; font-size: 20px; width: 33.333333%; text-align: center;
text-[20px] w-1/3 text-center">대학찾아줘!</h1>
</div>
<div class="w-full h-[10px] flex items-center justify-start mb-[50px]">
<div class="w-full h-[10px] bg-white rounded-[20px] relative">
    <div style="width:20%" class="h-full bg-purple-700 rounded-[10px]"></div>
</div>
<div id="text-purple-700" class="ml-[15px]">1<!-- -->/<!-- -->5</div>
</div>
<p class="mb-[20px] font-bold">몇 가지 정보를 알려주시면
<br>지원할 수 있는 대학을 추천해드립니다.</p>
<div>
<article class="w-full flex flex-col gap-[15px]">
    <div>
    <p class=" ">최저에 반영하고 싶은 과목을 선택해주세요.</p>
    </div>
    <div flex="flex" flex-col="flex-col" items-center="items-center" justify-center="justify-center">
    <button class="w-full h-[40px] flex items-center justify-center border border-line1 rounded-[10px] px-[20px]">
        <span>국어</span>
    </button>
    <button class="w-full h-[40px] flex items-center justify-center border border-line1 rounded-[10px] px-[20px]">
        <span>수학</span>
    </button>
    <button class="w-full h-[40px] flex items-center justify-center border border-line1 rounded-[10px] px-[20px]">
        <span>탐구1</span>
    </button>
    </div>
    <button class="w-full h-[40px] flex items-center justify-center bg-purple-700 text-white rounded-[10px]">
    <span>다음</span>
    </button>
</article>
</div>
`;

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('new_card');
    let step = 1;
    let selectedSubjects = [];
    let selectedAnswers = [];
    let universities = [];
    let selectedUniversity;
    let allSelectedMajors = [];

    // Create and append styles
    const style = document.createElement('style');
    style.textContent = `
        .home-link {
            text-decoration: none;
            color: #6a0dad;
            font-size: 18px;
        }
        
        h1 {
            margin: 0;
            color: #6a0dad;
            text-align: center;
        }

        h2 {
            text-align: center;
        }
        
        .progress-bar {
            width: 100%;
            background-color: #eee;
            margin: 20px 0;
            height: 10px;
            position: relative;
        }
        
        .progress {
            width: 20%;
            height: 100%;
            background-color: #6a0dad;
        }
        
        .form-section {
            padding: 20px;
            text-align: center;
        }
        
        .major-button,
        .university-button,
        .subject-button,
        .answer-button,
        .next-button {
            display: block;
            width: 100%;
            margin: 10px auto;
            padding: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: white;
            cursor: pointer;
            font-size: 16px;
        }
        
        .subject-button.selected,
        .answer-button.selected,
        .university-button.selected,
        .major-button.selected  {
            background-color: #dcdcdc;
        }
        
        .subject-button:hover,
        .answer-button:hover,
        .next-button:hover,
        .university-button:hover,
        .major-button:hover {
            background-color: #f0f0f0;
        }
        
        .next-button {
            background-color: #6a0dad;
            color: white;
        }
        
        .next-button:hover {
            background-color: #5a0cad;
        }
        
        .new-card-section {
            padding: 20px;
            text-align: center;
            margin-top: 20px;
        }

        .selected-items {
            margin: 10px 0;
            text-align: right;
        }
        
        .selected-items span {
            background-color: #A78BFA4D;
            padding: 5px 10px;
            margin-right: 10px;
            border-radius: 5px;
        }
        
        .selected-items .edit-button {
            background-color: #6a0dad;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
        }
        
        .loading {
            font-size: 18px;
            color: #6a0dad;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }
        
        .disabled {
            background-color: #dcdcdc;
            cursor: not-allowed;
        }

        .major-button.selected {
            background-color: #6a0dad;
            color: white;
        }

        .summary {
            background-color: #f9f9f9;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            margin: 10px 0;
            text-align: left;
        }
    `;
    document.head.appendChild(style);

    function loadPage() {
        let content = '';
        if (step === 1) {
            content = `
            <h1>대학찾아줘!</h1>
            <div class="progress-bar">
                <div class="progress"></div>
            </div>
            <section class="form-section">
                <p>몇 가지 정보를 알려주시면 지원할 수 있는 대학을 추천해드립니다.</p>
                <p>최저에 반영하고 싶은 과목을 선택해주세요.</p>
                <form id="subject-form">
                    <button type="button" class="subject-button">국어</button>
                    <button type="button" class="subject-button">수학</button>
                    <button type="button" class="subject-button">영어</button>
                    <button type="button" class="subject-button">한국사</button>
                    <button type="button" class="subject-button">탐구1</button>
                    <button type="button" class="subject-button">탐구2</button>
                    <button type="button" class="next-button">다음</button>
                </form>
            </section>
            <section id="result" class="new-card-section"></section>
            `;
        } else if (step === 2) {
            content = `
            <h1>대학찾아줘!</h1>
            <div class="progress-bar">
                <div class="progress" style="width: 40%;"></div>
            </div>
            <section class="form-section">
                <p>수리 논술을 보는 대학에 지원할까요?</p>
                <form id="answer-form">
                    <button type="button" class="answer-button">예</button>
                    <button type="button" class="answer-button">아니요</button>
                    <button type="button" class="answer-button">상관없어요!</button>
                    <button type="button" class="next-button">다음</button>
                </form>
                <div class="selected-items">
                    <span>${selectedSubjects.join(', ')}</span>
                    <span class="edit-button">과목 선택</span>
                </div>
            </section>
            `;
        } else if (step === 3) {
            content = `
            <h1>대학찾아줘!</h1>
            <div class="progress-bar">
                <div class="progress" style="width: 60%;"></div>
            </div>
            <section class="form-section">
                <p>학생부교과(내신)을 반영하는 대학에 지원할까요?</p>
                <form id="answer-form">
                    <button type="button" class="answer-button">예</button>
                    <button type="button" class="answer-button">아니요</button>
                    <button type="button" class="answer-button">상관없어요!</button>
                    <button type="button" class="next-button">다음</button>
                </form>
                <div class="selected-items">
                    <span>${selectedSubjects.join(', ')}</span>
                    <span class="edit-button">과목 선택</span>
                </div>
                <div class="selected-items">
                    <span>${selectedAnswers[0]}</span>
                    <span class="edit-button">수리 논술</span>
                </div>
            </section>
            `;
        } else if (step === 4) {
            content = `
                <h1>대학찾아줘!</h1>
                <div class="progress-bar">
                    <div class="progress" style="width: 80%;"></div>
                </div>
                <section class="form-section">
                    <p>출결을 반영하는 대학에 지원할까요?</p>
                    <form id="answer-form">
                        <button type="button" class="answer-button">예</button>
                        <button type="button" class="answer-button">아니요</button>
                        <button type="button" class="answer-button">상관없어요!</button>
                        <button type="button" class="next-button">다음</button>
                    </form>
                    <div class="selected-items">
                        <span>${selectedSubjects.join(', ')}</span>
                        <span class="edit-button">과목 선택</span>
                    </div>
                    <div class="selected-items">
                        <span>${selectedAnswers[0]}</span>
                        <span class="edit-button">수리 논술</span>
                    </div>
                    <div class="selected-items">
                        <span>${selectedAnswers[1]}</span>
                        <span class="edit-button">내신 반영</span>
                    </div>
                </section>
            `;
        } else if (step === 5) {
            content = `
                <h1>대학찾아줘!</h1>
                <div class="progress-bar">
                    <div class="progress" style="width: 100%;"></div>
                </div>
                <section class="form-section">
                    <p>개인 논술 스타일에 맞는 대학을 추천 받으시겠습니까?</p>
                    <form id="answer-form">
                        <button type="button" class="answer-button">예</button>
                        <button type="button" class="answer-button">아니요</button>
                        <button type="button" class="next-button">다음</button>
                    </form>
                    <div class="selected-items">
                        <span>${selectedSubjects.join(', ')}</span>
                        <span class="edit-button">과목 선택</span>
                    </div>
                    <div class="selected-items">
                        <span>${selectedAnswers[0]}</span>
                        <span class="edit-button">수리 논술</span>
                    </div>
                    <div class="selected-items">
                        <span>${selectedAnswers[1]}</span>
                        <span class="edit-button">내신 반영</span>
                    </div>
                    <div class="selected-items">
                        <span>${selectedAnswers[2]}</span>
                        <span class="edit-button">출결 반영</span>
                    </div>
                </section>
            `;
        } else if (step === 6) {
            content = `
                <div class="loading">
                    <div class="spinner"></div>
                    <p>당신에게 꼭 맞는 대학을 찾고 있습니다.</p>
                </div>
            `;
            fetchUniversities();
        } else if (step === 7) {
            content = `
                <h2>지원할 수 있는 대학 목록이에요.</h2>
                <section class="form-section">
                <p>대학을 선택하면 학과를 고를 수 있어요.<br>중복 지원이 어려운 일정은 자동으로 제외돼요.</p>
                    ${universities.map((university, index) => `
                        <button type="button" class="university-button ${areAllMajorsDisabled(university.majors) ? 'disabled' : ''}" data-index="${index}">${university.name}</button>
                    `).join('')}
                    <button type="button" class="next-button">원하는 대학을 모두 선택했어요.</button>
                </section>
            `;
        } else if (step === 8) {
            content = `
                <h1>지원할 수 있는 대학 목록이에요.</h1>
                <section class="form-section">
                    <p>학과를 선택해주세요.</p>
                    ${selectedUniversity.majors.map((major, index) => `
                        <button type="button" class="major-button ${isMajorDisabled(major.examDate) ? 'disabled' : ''}" data-index="${index}">${major.name}</button>
                    `).join('')}
                    <button type="button" class="next-button">선택 완료</button>
                </section>
            `;
        } else if (step === 9) {
            content = `
                <h1>최종 선택하신 대학 정보에요.</h1>
                <section class="form-section">
                    ${allSelectedMajors.map(major => `
                    <div class="summary">
                        <p>대학: ${major.university}</p>
                        <p>전공: ${major.name}</p>
                        <p>논술 일정: ${major.examDate}</p>
                        <p>경쟁률: ${major.competitionRate}</p>
                        <p>최저등급: ${major.minGrade}</p>
                    </div>
                    `).join('')}
                    <button type="button" class="next-button">돌아가기</button>
                </section>
            `;
        }

        container.innerHTML = content;

        if (step <= 5) {
            addInitialEventListeners();
        } else if (step === 7) {
            addUniversitySelectionListeners();
        } else if (step === 8) {
            addMajorSelectionListeners();
        } else if (step === 9) {
            addFinalStepListeners();
        }
    }

    function addInitialEventListeners() {
        const subjectButtons = document.querySelectorAll('.subject-button');
        const answerButtons = document.querySelectorAll('.answer-button');
        const nextButton = document.querySelector('.next-button');

        subjectButtons.forEach(button => {
            button.addEventListener('click', () => {
                button.classList.toggle('selected');
            });
        });

        answerButtons.forEach(button => {
            button.addEventListener('click', () => {
                answerButtons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
            });
        });

        nextButton.addEventListener('click', () => {
            if (step === 1) {
                selectedSubjects = Array.from(document.querySelectorAll('.subject-button.selected')).map(btn => btn.textContent);
                if (selectedSubjects.length > 0) {
                    step++;
                    loadPage();
                } else {
                    alert('Please select at least one subject');
                }
            } else {
                const selectedAnswer = document.querySelector('.answer-button.selected');
                if (selectedAnswer) {
                    selectedAnswers.push(selectedAnswer.textContent);
                    step++;
                    loadPage();
                } else {
                    alert('Please select an answer');
                }
            }
        });
    }

    function addUniversitySelectionListeners() {
        const universityButtons = document.querySelectorAll('.university-button');
        const nextButton = document.querySelector('.next-button');

        universityButtons.forEach(button => {
            if (!button.classList.contains('disabled')) {
                button.addEventListener('click', () => {
                    universityButtons.forEach(btn => btn.classList.remove('selected'));
                    button.classList.add('selected');
                    selectedUniversity = universities[button.dataset.index];
                    step++;
                    loadPage();
                });
            }
        });

        nextButton.addEventListener('click', () => {
            step = 9;
            loadPage();
        });
    }

    function addMajorSelectionListeners() {
        const majorButtons = document.querySelectorAll('.major-button');
        const nextButton = document.querySelector('.next-button');

        majorButtons.forEach(button => {
            if (!button.classList.contains('disabled')) {
                button.addEventListener('click', () => {
                    button.classList.toggle('selected');
                    const index = button.dataset.index;
                    const major = selectedUniversity.majors[index];
                    if (button.classList.contains('selected')) {
                        major.selected = true;
                        allSelectedMajors.push(major);
                    } else {
                        major.selected = false;
                        allSelectedMajors = allSelectedMajors.filter(m => m !== major);
                    }
                    updateMajorDisability();
                });
            }
        });

        nextButton.addEventListener('click', () => {
            if (allSelectedMajors.length > 0) {
                step = 7;
                loadPage();
            } else {
                alert('Please select at least one major');
            }
        });
    }

    function updateMajorDisability() {
        const majorButtons = document.querySelectorAll('.major-button');
        majorButtons.forEach(button => {
            const index = button.dataset.index;
            const major = selectedUniversity.majors[index];
            if (isMajorDisabled(major.examDate)) {
                button.classList.add('disabled');
                button.classList.remove('selected');
            } else {
                button.classList.remove('disabled');
            }
        });
    }
        
    function isMajorDisabled(examDate) {
        return allSelectedMajors.some(major => major.examDate === examDate);
    }

    function areAllMajorsDisabled(majors) {
        return majors.every(major => isMajorDisabled(major.examDate));
    }

    function addFinalStepListeners() {
        const nextButton = document.querySelector('.next-button');
        
        nextButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    function fetchUniversities() {
        fetch('./assets/data/university_data.json')
        .then(response => response.json())
        .then(data => {
            const uniqueUniversities = {};

            data.forEach(university => {
                if (!uniqueUniversities[university.university]) {
                    uniqueUniversities[university.university] = {
                        name: university.university,
                        majors: []
                    };
                }
                uniqueUniversities[university.university].majors.push({
                    university: university.university,
                    name: university.major,
                    examDate: new Date(university.date).toLocaleDateString(),
                    competitionRate: `${university.competition_rate} 대 1`,
                    minGrade: `${university.subject} 합 ${university.rating}`,
                    selected: false
                });
            });

            universities = Object.values(uniqueUniversities);
            step++;
            loadPage();
        })
        .catch(error => {
            console.error('Error fetching university data:', error);
        });
    }

    loadPage();
});