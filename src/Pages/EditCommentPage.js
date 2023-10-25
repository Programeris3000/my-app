import { useParams } from "react-router-dom"
import Container from "../Components/Container/Container"

const EditCommentPage = () => {
  const {ID} = useParams()
  return (
    <Container>
      Edit Comment Page{ID}
      
    </Container>
  )
}

export default EditCommentPage