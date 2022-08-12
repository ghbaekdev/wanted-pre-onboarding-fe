## 🚀원티드 사전과제 Login과 TodoList

---

## ⌨️ 기술 스택

| Language | Library |
| :------: | :-----: |

| <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javscript&logoColor=white">
<img src="https://img.shields.io/badge/typesciprt-3178C6?style=for-the-badge&logo=styledcomponents&logoColor=white"> | <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <br /> <img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"><br /><img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"><img src="https://img.shields.io/badge/antdesign-0170FE?style=for-the-badge&logo=antdesign&logoColor=white">
|

---

### 로그인페이지 ('/auth')

![login-assignment](https://user-images.githubusercontent.com/97820540/183247808-ed94ad9f-dadb-42d7-a227-dd73456b0ba2.gif)

##### /auth 경로에 로그인 / 회원가입 기능을 개발합니다

> 로그인, 회원가입을 별도의 경로로 분리해도 무방합니다

- loginmodal 컴포넌트를 재활용하여 signup버튼 클릭시엔 signup 기능을, login 버튼을 클릭시 login 기능을 사용할 수 있게 구현.

> 최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성해주세요

- 이메일, 비밀번호 input 및 제출 button 구현.

* 이메일과 비밀번호의 유효성을 확인합니다

> 이메일 조건 : 최소 @, . 포함
> 비밀번호 조건 : 8자 이상 입력
> 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요

- includes method를 활용하여 이메일 '@', '.' 및 비밀번호 8자이상시 버튼 활성화 되도록 유효성 검사 구현.

<br />

> 로그인 API를 호출하고, 올바른 응답을
> 받았을 때 루트 경로로 이동시켜주세요

- email, password post 후 응답 성공시 navigate를 활용하여 루트 경로로 이동 구현.

> 응답으로 받은 토큰은 로컬 스토리지에 저장해주세요

- 응답 성공시 받은 토큰 로컬 스토리지에 저장 구현.

> 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요

- 토큰이 로컬스토리지에 있는 상태에서 로그인버튼 클릭시 조건문 활용하여 토큰이 있을 경우엔 로그인화면이 아닌 루트경로로 이동하게끔 구현.

> 어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트 시켜주세요

- settimeout 함수를 활용하여 main페이지에서 토큰이 없는경우에 alert 메세지와 함께 로그인페이지로 이동하게끔 구현.

---

### Todo ('/')

![todo-assignment](https://user-images.githubusercontent.com/97820540/183248172-8fd6681b-880f-4ad8-a3cf-154a63b046bb.gif)

##### Todo List API를 호출하여 Todo List CRUD 기능을 구현해주세요

> 목록 / 상세 영역으로 나누어 구현해주세요

- 목록과 상세페이지를 main과 detail로 나누어 구현 완료.

> Todo 목록을 볼 수 있습니다.

- list 컴포넌트에 axios get 통신으로 받아온 data의 title을 map method를 활용하여 구현완료.

> Todo 추가 버튼을 클릭하면 할 일이 추가 됩니다.

- add 버튼 클릭시 add input value 값을 axios. create로 통신하여 추가.

> Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소할 수 있습니다.

- 수정버튼 클릭시 detail 페이지 label이 input으로 변환되며 수정모드로 전환. 취소시 다시 label로 변환되게 구현완료.

> Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제할 수 있습니다.

- 리스트의 x버튼 클릭시 axios.delete로 해당 아이디에 해당 하는 값 삭제 할 수 있게끔 구현.

###### 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요.

- 처음에는 detail 페이지를 아예 다른 페이지로 구현하였었으나 List와 detail이 같이 보일수 있게 detail을 조건부 렌더링하여 List와 detail을 한번에 보일 수 있게함.

> 새로고침을 했을 때 현재 상태가 유지되어야 합니다.

- 클라이언트 데이터가 아닌 서버에서 axios 통신으로 받아온 데이터를 state에 담았으므로 새로고침 시에도 현재 상태 유지.

> 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요.

- detail에 id 값으로 url을 부여하여 navigate(-1) 실행시에 조회 순서에 따라 조회가능하게 구현 완료.

##### 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현해주세요

> 수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야 합니다

- todoList와 todoDetail을 한개의 state로 사용하려 했으나 typescript를 사용하여 List는 data type이 object Detail은 object 형태여서 state 한개만으로는 불가.
  <br />
  List에서 클릭한 id값과 detail 페이지의 id값이 같을 경우 detail에서 작성된 값이 List에 적용되게 삼항연산자 활용하여 구현.

### 1주차 Refactoring

- 전체적인 함수, 변수 네이밍 부분 부터 접근하여 가독성을 높였습니다.

- custom hooks을 사용하여 useInputs 컴포넌트로 login과 todo 페이지에서 반복되는 부분 훅으로 분리하여 재사용하였습니다.

- axios도 반복되는 부분 base_url을 같이 설정주어 분리하였고 추후 custom hook으로 분리해볼 예정입니다.
