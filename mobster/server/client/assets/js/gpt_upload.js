function convertNewlinesToBreaks(text) {
    return text.replace(/\n/g, '<br>');
}

document.getElementById('button-search').addEventListener('click', function() {
    const selectedOption = document.getElementById('dropdown').value;
    const idMap = {
        "option1": "24",
        "option2": "23",
        "option3": "22",
        "option4_1": "21-1",
        "option4_2": "21-2"
    };

    const selectedId = idMap[selectedOption];

    // Fetch the JSON file
    fetch('../assets/data/yonsei_data_all_p.json')
    .then(response => response.json())
    .then(data => {
        // Get the container element
        const item = data.find(entry => entry.id === selectedId);
        const container = document.getElementById('essay_yonsei');
        if (!item) {
            container.innerHTML = 'No data found for the selected option.';
        } else {
            // Create HTML content from the JSON data
            let image1=`<div class="display_none"></div>`, image2=`<div class="display_none"></div>`, add_text1_1=`<div class="display_none"></div>`, add_text1_2=`<div class="display_none"></div>`;
            if (item.id === "24" || item.id === "23"){
                image1 = `<img src="../assets/img/essay_writing/text_d_${item.id}.png" class="width_100" alt="">`;
                add_text1_2 = `<p class="mb-4"><strong>[지문 A]</strong> <br> ${item.additional_text_a}</p>`;
            } else {
                image2 = `<img src="../assets/img/essay_writing/question_2_1_${item.id}.png" class="width_100" alt="">`;
                if (item.id === "22") {
                    add_text1_1 = `<p class="mb-4"><strong>[지문 A]</strong> <br> ${item.additional_text_a}</p>`;
                }
            }
            const htmlContent = `
                <h2>20${item.id}학년도 연세대학교 수시모집 논술시험 문제</h2>
                <hr>
                <p><strong>＊아래 제시문을 읽고 문제에 답하시오.</strong></p>
                <p class="mb-4"><strong>&lt;제시문 가&gt;</strong> <br> ${item.text_a}</p>
                <p class="mb-4"><strong>&lt;제시문 나&gt;</strong> <br> ${item.text_b}</p>
                <p class="mb-4"><strong>&lt;제시문 다&gt;</strong> <br> ${item.text_c}</p>
                <p class="mb-4"><strong>&lt;제시문 라&gt;</strong> <br> ${item.text_d}</p>` +
                image1 +
                `<p class="mb-4"><strong>[문제 1-1]</strong> <br> ${item.question_1_1}</p>` +
                add_text1_1 +
                `<textarea class="width_100" name="" id="" rows="8"></textarea>
                <p class="mb-4"><strong>[문제 1-2]</strong> <br> ${item.question_1_2}</p>` +
                add_text1_2 +
                `<textarea class="width_100" name="" id="" rows="8"></textarea>
                <p class="mb-4"><strong>[문제 2-1]</strong> <br> ${item.question_2_1}</p>` +
                image2 + 
                `<textarea class="width_100" name="" id="" rows="8"></textarea>
                <p class="mb-4"><strong>[문제 2-2]</strong> <br> ${item.question_2_2}</p>
                <textarea class="width_100" name="" id="" rows="8"></textarea>
                <button id="submit-tn" class="btn btn-primary" height="100" width="200">제출</button>
                <br>
                <div id="loading" style="display: none;">
                    <div class="spinner"></div>
                </div>
                <div id="response-area"></div>
            `;

            // Set the HTML content
            container.innerHTML = htmlContent;

            document.getElementById('submit-tn').addEventListener("click", async () => { 
                const textareaValues = Array.from(document.querySelectorAll('textarea')).map(textarea => textarea.value);
                const loading = document.getElementById('loading');

                console.log('Before setting display to block:', loading.style.display);
                loading.style.display = 'block';
                console.log('After setting display to block:', loading.style.display);

                const messages = [
                    {role: "system", content: `Role(역할지정):
                    당신은 한국 논술 시험에 대한 평가 및 피드백 제공을 전문으로 하는 대학 입학 논술 시험 전문가입니다.
                    
                    Context(상황):
                    - 목표: 제공된 제시문과 문제를 바탕으로 학생이 제출한 논술 답안을 평가하고, 논리적이고 구체적인 피드백을 제공하여 글을 개선할 수 있도록 돕는다.
                    - 상황: 학생의 논술 답안을 받고, 각 문제에 대해 평가와 첨삭 과정을 진행합니다.
                    
                    Input Values(입력값):
                    - 제공된 제시문과 문제:
                        - 제시문 A: ${item.text_a}
                        - 제시문 B: ${item.text_b}
                        - 제시문 C: ${item.text_c}
                        - 제시문 D: ${item.text_d}
                        - 문제 1-1: ${item.question_1_1}
                        - 문제 1-2: ${item.question_1_2}
                        - 문제 2-1: ${item.question_2_1}
                        - 문제 2-2: ${item.question_2_2}
                    - 학생의 논술 답안:
                        - 답안 1-1: ${textareaValues[0]}
                        - 답안 1-2: ${textareaValues[1]}
                        - 답안 2-1: ${textareaValues[2]}
                        - 답안 2-2: ${textareaValues[3]}
                    
                    Instructions(단계별 지시사항):
                    1. **[Step 1] 문제별 문장별 첨삭**
                        - 학생의 답안을 한 문장씩 평가합니다.
                        - 문법, 어휘, 논리적 흐름을 고려하여 필요한 부분을 논리적으로 첨삭합니다.
                        - <span>학생의 답안: [학생의 답안 텍스트]</span><br><span style="color:blue;">수정된 답안: [수정된 답안]</span><br> 형식으로 학생의 답안을 첨삭합니다.

                    2. **[Step 2] 문제별 총평**
                        - 문제별로 전체적인 내용을 요약하고 평가합니다.
                        - 상, 중, 하의 평가와 함께 이유를 구체적으로 설명합니다.
                        - 논리력, 지문독해력, 필력 등의 내용을 종합적으로 평가하고, 이후 공부 방향 또는 답안 작성 방향을 제시합니다.
                        - 개선해야 할 부분과 그 이유를 구체적으로 설명합니다.
                    
                    Constraints(제약사항):
                    - 답변은 반드시 한글로 작성되어야 합니다.
                    - 학생의 논술 답안을 각 문제를 따로 평가할 것.
                    - 출력 시 모든 줄바꿈은 <br> 태그로 변환합니다.
                    - 각 문제의 제목은 <h4> 태그를 사용합니다.
                    - 수정된 학생의 답안은 <span style="color:blue;">[수정된 답안]</span> 형식으로 강조 표시합니다.
                    - 문제별로 <hr> 태그로 구분선을 추가합니다.
                    - 첨삭과 총평 사이에도 <hr> 태그로 구분선을 추가합니다.
                    - 맨 처음에 html 글 추가하지 않기
                    
                    Output Indicator(출력값 지정):
                    - 출력 형식: HTML
                    - 출력 필드:
                        - 문제 1-1 문장별 첨삭
                        - 문제 1-1 총평
                        - 문제 1-2 문장별 첨삭
                        - 문제 1-2 총평
                        - 문제 2-1 문장별 첨삭
                        - 문제 2-1 총평
                        - 문제 2-2 문장별 첨삭
                        - 문제 2-2 총평`},
                ];
                try {
                    fetch('/api/gpt-essay-review', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ messages })
                    })
                    .then((res) => res.text())
                    .then((text) => {
                        // const gptText = convertNewlinesToBreaks(text);
                        document.getElementById('response-area').innerHTML = `<h3>Review Result:</h3><div>${text}</div>`;
                        loading.style.display = 'none';
                    })
                    .catch((err) => {
                        document.getElementById('response-area').innerHTML = `<h3>Review Result:</h3><div>Error1: ${error.message}</div>`;
                        loading.style.display = 'none';
                    });
                } catch (error) {
                    document.getElementById('response-area').innerHTML = `<h3>Review Result:</h3><div>Error2: ${error.message}</div>`;
                    loading.style.display = 'none';
                }
            });
        }
    })
    .catch(error => {
        console.error('Error loading the JSON file:', error);
        document.getElementById('content').innerHTML = '<p>Error loading data.</p>';
    });
});