import React from "react";
import axios from "axios";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import { Card, CardContent, Typography, Button } from "@mui/material";
import Form from '../components/Form/Form'

interface Post {
  id: number;
  title: string;
}

interface IndexPageProps {
  posts: Post[];
}

function Index({ posts }: IndexPageProps) {
  console.log(posts);
  return (
    <>
    <Card style={{margin:'40px'}}>
      <CardContent>
      <Form/>
      </CardContent>
    </Card>
    
      <Grid container spacing={1}>
        {posts.map((item) => (
          <Grid key={item.id} lg={3} item xs={12} sm={6}>
            <Card style={{ height: "250px", position: "relative" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  <p> Title :{item.title}</p>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Link href={`/${item.id}`}>
                    <Button
                      style={{ position: "absolute", bottom: "10px" }}
                      variant="contained"
                      color="primary"
                    >
                      More...
                    </Button>
                  </Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export async function getStaticProps() {
  const response = await axios.get<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const posts = response.data;

  return {
    props: {
      posts,
    },
    revalidate: 10, // بازسازی صفحه هر 10 ثانیه
  };
}

export default Index;