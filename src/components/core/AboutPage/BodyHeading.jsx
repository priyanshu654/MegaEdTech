

export default function BodyHeading({heading,text}) {
  return (
    <div className='flex gap-10 flex-col text-pure-greys-200 text-center'>
        <h1 className='font-bold text-4xl'>{heading}</h1>
        <p>{text}</p>
    </div>
  )
}
