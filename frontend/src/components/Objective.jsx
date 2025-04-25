import simplebell from '../assets/icons/simplebell.png'

function Objective({title, content}) {
    return (
        <div className="inline-block bg-[#38BAF2] rounded-4xl p-4 absolute mt-150 ml-58 border-[#20417E] border-10 max-w-90 max-h-60">
            <div className="bubble-text text-[#FFCC26] flex flex-col items-center py-2 border-10 border-[#1B5A82] rounded-xl">
                <span className="text-3xl">{title}</span>
                <div className="flex items-center gap-4  justify-center">
                    <img src={simplebell} alt="Card doorbell" className="w-20 h-auto" />
                    <p className="text-xl text-center w-1/2">{content}</p>
                </div>
            </div>
        </div>
    )
}

export default Objective;