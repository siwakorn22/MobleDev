import Post from "./Post";
import Comment from "./Comment";
import Card from "./Card";
import Navbar from "./Navbar";


function App() {
  return (
   <div>
    <Navbar></Navbar>
    <Post userId="Dek_SE" message="I got a grade A in Mobile Programming. ">
        <Comment userId="siwa_se" message="Wow i love you" />
        <Comment userId="pim_se" message=" i have you " />
    </Post>
    <Card/>
   </div>
  );
}

export default App;
