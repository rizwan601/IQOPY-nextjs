import { StaticImageData } from "next/image"

import teamImg_1 from "@/assets/img/team/team_img01.png"
import teamImg_2 from "@/assets/img/team/team_img02.png"
import teamImg_3 from "@/assets/img/team/team_img03.png"
import teamImg_4 from "@/assets/img/team/team_img04.png"
import teamImg_5 from "@/assets/img/team/team_img05.png"
import teamImg_6 from "@/assets/img/team/team_img06.png"
import teamImg_7 from "@/assets/img/team/team_img07.png"
import teamImg_8 from "@/assets/img/team/team_img08.png"

interface DataType {
   id: number;
   img: StaticImageData;
   title: string;
   profession: string;
}

const team_data: DataType[] = [
   {
      id: 1,
      img: teamImg_1,
      title: "Floyd Miles",
      profession: "Marketer",
   },
   {
      id: 2,
      img: teamImg_2,
      title: "Eleanor Pena",
      profession: "Founder & CEO",
   },
   {
      id: 3,
      img: teamImg_3,
      title: "Arlene McCoy",
      profession: "Technology Officer",
   },
   {
      id: 4,
      img: teamImg_4,
      title: "Robert Fox",
      profession: "Financial Officer",
   },
   {
      id: 5,
      img: teamImg_5,
      title: "Jacob Jones",
      profession: "Head of Blockchain",
   },
   {
      id: 6,
      img: teamImg_6,
      title: "Albert Flores",
      profession: "Product Designer",
   },
   {
      id: 7,
      img: teamImg_7,
      title: "Devon Lane",
      profession: "Visual Designer",
   },
   {
      id: 8,
      img: teamImg_8,
      title: "Jerome Bell",
      profession: "Legal & DPO",
   },
]

export default team_data;