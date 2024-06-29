import Blog from "@/components/blogs/blog";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
  title: "Blog iQopy | Smart's Money Edge",
};
const index = () => {
  return (
    <Wrapper>
      <Blog />
    </Wrapper>
  )
}

export default index