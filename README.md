# 개론티: 대학 입시생들을 위한 AI 기반 논술 도움 서비스

## 실행 순서
1. 우선 git clone을 하여 다운받는다
    ```
    git clone ${HTTPS}$ 
    ```
2. gpt4o를 활용할 수 있는 openai api key를 https://platform.openai.com/api-keys 사이트에서 새로 생성하고, mobster/server 폴더안에 있는 .env 파일에서 "OPENAI_SECRET_KEY" 변수에 넣는다
3. terminal의 현재 실행 위치를 조정한다
    ```
    cd swai/mobster/server
    ```
4. 실행한다
    ```
    npm start
    ```
5. 실행 후 localhost:8080으로 이동하여 확인한다.
    -> 아래 두 서비스를 이용해 볼 수 있다.
    - 대학 추천 서비스
    - 논술 첨삭 서비스
