import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

interface Post {
  title: string;
  body: string;
}

interface PostPageProps {
  posts: Post;
  comment: Comment[];
}

function Post({ posts, comment }: PostPageProps) {
  return (
    <div>
      <div style={{ margin: '40px' }}>
        <h1>{posts.title}</h1>
        <p>{posts.body}</p>
      </div>
      <p style={{ marginLeft: '40px' }}>Comments :</p>
      {comment.map((item) => (
        <Card key={item.id} style={{ margin: '40px' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography variant="h5" component="div">
              {item.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.body}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { id } = context.params;

  const responseComment = await axios.get<Comment[]>(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );
  const comment = responseComment.data;

  const responsePost = await axios.get<Post>(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const posts = responsePost.data;

  return {
    props: {
      posts,
      comment,
    },
  };
}

export default Post;
