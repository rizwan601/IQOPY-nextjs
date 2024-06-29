import BlogDetailsArea from "@/components/blogs/blog-details/BlogDetailsArea";
import Breadcrumb from "@/components/common/Breadcrumb";
import blog_data from "@/data/BlogData";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
   title: "Blog Details iQopy | Smart's Money Edge",
};
const index = ({ params }: { params: { id: number } }) => {

   const single_blog = blog_data.find((item) => Number(item.id) === Number(params.id));

   return (
      <Wrapper>
         <main>
            <Breadcrumb title="Blog Details" />
            <BlogDetailsArea  single_blog={single_blog} key={single_blog?.id} />
         </main>
      </Wrapper>
   )
}

export default index