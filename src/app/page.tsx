import AirbnbNav from '@/components/AirbnbNav';
import AirbnbFooter from '@/components/AirbnbFooter';
import Banner from '@/components/Banner';
import PostCard from '@/components/PostCard';
import ServerPagination from '@/components/ServerPagination';

// Define Interface for Post Data
interface Post {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  owner: {
    _id: string;
    name: string;
    avatar?: string;
  };
}

interface PostsResponse {
  status: string;
  data: {
    posts: Post[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

async function getPosts(page: number = 1): Promise<PostsResponse | null> {
  try {
    const res = await fetch(`http://localhost:3050/api/v1/posts?page=${page}&limit=12&isPublished=true`, {
      cache: 'no-store', // Ensure dynamic fetching
    });

    if (!res.ok) {
      console.error('Failed to fetch posts:', res.statusText);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return null;
  }
}

export default async function Home(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const data = await getPosts(page);

  const posts = data?.data?.posts || [];
  const totalPages = data?.data?.pagination?.pages || 0;

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
      <AirbnbNav />

      <main className="flex-1 flex flex-col items-center w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 pb-20">
        <Banner />

        <section className="w-full mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Examples of stays</h2>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  location={post.location}
                  price={post.price}
                  images={post.images}
                  rating={4.9} // Placeholder for now, assumed logic
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-xl text-gray-500">No posts found.</p>
            </div>
          )}

          <div className="mt-8">
            <ServerPagination totalPages={totalPages} />
          </div>
        </section>
      </main>

      <AirbnbFooter />
    </div>
  );
}
