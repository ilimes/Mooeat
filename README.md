# Mooeat

### 개발 환경 설정
- [ ] [NodeJS](https://nodejs.org/ko/) : v18.16.1
  - 노드 버전 매니저([nvm](https://github.com/nvm-sh/nvm))를 사용하는 것을 추천합니다.
- [ ] 패키지 매니저 : [npm](https://nodejs.org/en/)
- [ ] 최신 개발 branch는 **`develop`** 입니다.

### 저장소 클론
**`git clone`** 명령어를 실행하여 원격 저장소의 커밋을 로컬 저장소에 내려받습니다.
```bash
$ git clone https://github.com/ilimes/Mooeat.git
```

### 개발 branch 내려받기
**`git pull`** 명령어로 **`develop`** branch를 내려받습니다.
```bash
$ git pull origin develop
```

### 의존성 설치
**`npm i`** 또는 **`npm install`** 명령어로 의존성 설치를 진행합니다.
```bash
$ npm i
```

### .env 작성
**`.env`** 를 작성하여 프로젝트 디렉토리에 넣어줍니다. 아래는 예시입니다.
```bash
EXAMPLE=xxx.xxx.xxx.xxx
```

### 개발 서버 띄우기
**`npm run dev`** 명령어로 개발 서버를 띄웁니다. 
```bash
$ npm run dev
```

