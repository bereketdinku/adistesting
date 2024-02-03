import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import AddSongForm from "./AddSongForm";

const AddSongs = () => {
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <AddSongForm />
        </FormWrap>
      </Container>
    </div>
  );
};

export default AddSongs;
