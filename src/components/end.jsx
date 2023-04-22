import { BsLinkedin,BsInstagram,BsFillPersonFill,BsGithub } from 'react-icons/bs'
import '../static/end.css'

export default function End(){
  return(
    <div className='contacts'>
        <a href={'https://www.linkedin.com/in/arihara-sudhan/'}><BsLinkedin/></a>
        <a href={'https://github.com/arihara-sudhan/'}><BsGithub/></a>
        <a href={'https://arihara-sudhan.github.io/'}><BsFillPersonFill/></a>
        <a href={'https://www.instagram.com/aravind_ariharasudhan_/'}><BsInstagram/></a>
    </div>);
}