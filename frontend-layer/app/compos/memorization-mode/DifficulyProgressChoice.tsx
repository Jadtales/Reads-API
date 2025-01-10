import {ReactElement, Ref, useRef} from "react";

interface ComponentProps{
    buttonsRef: Ref<(HTMLButtonElement)[]>
}

export default function ({buttonsRef}: ComponentProps): ReactElement {


    return <div className="difficultyLearningProcess">
        <button ref={el => buttonsRef!.current[0] = el}
                className="difficultyLevel_again">Forgotten</button>
        <hr/>
        <button ref={el => buttonsRef!.current[1] = el}
                className="difficultyLevel_hard">Unclear</button>
        <hr/>
        <button ref={el => buttonsRef!.current[2] = el}
                className="difficultyLevel_good">Good</button>
        <hr/>
        <button ref={el => buttonsRef!.current[3] = el}
                className="difficultyLevel_easy">Perfect</button>
    </div>
}