
import { useRouter } from "next/navigation";
import Container from "../../components/Container";
import FormWrap from "../../components/FormWrap";
import EditSongForm from "./EditSongFrom";
interface IParams{
    songId:string
}
const EditSongs = ({params}:{params:IParams}) => {
    // const router = useRouter();
    const{id}=params;
    console.log(id)
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <EditSongForm songId={id} />
        </FormWrap>
      </Container>
    </div>
  );
};

export default EditSongs;
