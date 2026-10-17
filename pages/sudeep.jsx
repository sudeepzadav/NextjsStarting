import Image from "next/image"

// import Walpaper from "../public/walpaper.jpg"
const sudeep = () => {
  return (
    <div>
      <div>
        <Image src={'/walpaper.jpg'} alt="Walpaper Image" width={500} height={500}/>
      </div>
      <div>
        <Image src={'https://t4.ftcdn.net/jpg/17/75/08/83/360_F_1775088302_BmCZ56SeraflCPN752yGUKfGXjm7eDkT.jpg'} height={500} width={250}></Image>
      </div>
    </div>
  )
}

export default sudeep
