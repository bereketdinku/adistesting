import Container from "../components/Container";
import ManageSongClient from "./ManageSongClient";

const ManageSongs = () => {
  return (
    <div className="pt-8">
      <Container>
        <ManageSongClient />
      </Container>
    </div>
  );
};

export default ManageSongs;
