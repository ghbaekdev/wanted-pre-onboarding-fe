## 🚀원티드 사전과제 Login과 TodoList

---

## ⌨️ 기술 스택

| Language | Library |
| :------: | :-----: |

| <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javscript&logoColor=white">
<img src="https://img.shields.io/badge/typesciprt-3178C6?style=for-the-badge&logo=styledcomponents&logoColor=white"> | <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <br /> <img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"><br /><img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"><img src="https://img.shields.io/badge/antdesign-0170FE?style=for-the-badge&logo=antdesign&logoColor=white">
|

---

### 로그인페이지 ('/')

![Aug-20-2022 12-33-15](https://user-images.githubusercontent.com/97820540/185727444-3f23799c-b93a-48e8-9b75-80e61f680f75.gif)

##### / 경로에 로그인 / 회원가입 기능을 개발해주세요.

> 페이지 안에 이메일 입력창, 비밀번호 입력창, 제출 버튼이 포함된 형태로 구성해주세요.

> 로그인, 회원가입을 별도의 경로로 분리해도 무방합니다

- loginmodal 컴포넌트를 재활용하여 signup버튼 클릭시엔 signup 기능을, login 버튼을 클릭시 login 기능을 사용할 수 있게 구현.

- 이메일, 비밀번호 input 및 제출 button 구현.

* 이메일과 비밀번호의 유효성 검사기능을 구현해주세요

> 이메일 조건 : 최소 @ 포함
> 비밀번호 조건 : 8자 이상 입력
> 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요

- includes method를 활용하여 이메일 '@' 및 비밀번호 8자이상시 버튼 활성화 되도록 유효성 검사 구현.

<br />

> 로그인 API를 호출하고, 올바른 응답을
> 받았을 때 /todo 경로로 이동시켜주세요

- email, password post 후 응답 성공시 navigate를 활용하여 루트 경로로 이동 구현.

> 응답으로 받은 토큰은 로컬 스토리지에 저장해주세요

- 응답 성공시 받은 토큰 로컬 스토리지에 저장 구현.

> 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요

- 토큰이 로컬스토리지에 있는 상태에서 로그인버튼 클릭시 조건문 활용하여 토큰이 있을 경우엔 로그인화면이 아닌 루트경로로 이동하게끔 구현.

> 로그인 여부에 따른 리다이렉트 처리를 구현해주세요.

- 토큰을 리코일 라이브러리 활용하여 전역스테이트에 담은뒤 조건문 활용하여 토큰이 있는지 확인. 없을경우 로그인 페이지로 리다이렉트

---

### Todo ('/todo')

![Aug-20-2022 12-33-46](https://user-images.githubusercontent.com/97820540/185727466-20a0828b-2fd8-4b9e-aa55-4f82192b0a12.gif)

##### Todo List API를 호출하여 Todo List CRUD 기능을 구현해주세요

> /todo 경로에 접속하면 투두 리스트의 목록을 볼 수 있도록 해주세요.

- 목록과 상세페이지를 main과 detail로 나누어 구현 완료.

> 리스트 페이지에는 투두 리스트의 내용과 완료 여부가 표시되어야 합니다.

- list 컴포넌트에 axios get 통신으로 받아온 data의 todo와 isCompleted를 map method를 활용하여 구현완료.

> 리스트 페이지에는 입력창과 추가 버튼이 있고, 추가 버튼을 누르면 입력창의 내용이 새로운 투두 리스트로 추가되도록 해주세요.

- add 버튼 클릭시 add input value 값을 axios. create로 통신하여 추가.

* 투두 리스트의 수정, 삭제 기능을 구현해주세요

> 투두 리스트의 개별 아이템 우측에 수정버튼이 존재하고 해당 버튼을 누르면 수정모드가 활성화되고 투두 리스트의 내용을 수정할 수 있도록 해주세요

- 수정버튼 클릭시 label에 담겨 있던 todo가 input으로 변경되어 수정이 가능하도록 구현.

> 수정모드에서는 개별 아이템의 우측에 제출버튼과 취소버튼이 표시되며 해당 버튼을 통해서 수정 내용을 제출하거나 수정을 취소할 수 있도록 해주세요

- 수정모드시에 수정취소와 수정완료 버튼이 있으며 수정 완료시 put 통신을 통하여 업데이트, 수정 취소시 input이 label로 다시 변경

> 투두 리스트의 개별 아이템 우측에 삭제버튼이 존재하고 해당 버튼을 누르면 투두 리스트가 삭제되도록 해주세요

- 리스트의 x버튼 클릭시 axios.delete로 해당 아이디에 해당 하는 값 삭제 할 수 있게끔 구현.
