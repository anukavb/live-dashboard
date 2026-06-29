import "./Checklist.css";

import useStore from "../store/useStore";

export default function Checklist() {

    const checks = useStore(s => s.checkStates);

    const toggle = useStore(s => s.toggleCheck);

    const tasks = [

        "Finalize UI",

        "Backend API",

        "Testing",

        "Deploy",

        "Presentation"

    ];

    return (

        <div className="panel">

            <h3>Project Checklist</h3>

            {

                tasks.map((task, index) => (

                    <label
                        key={task}
                        className="check-item"
                    >

                        <input

                            type="checkbox"

                            checked={checks[index]}

                            onChange={() => toggle(index)}

                        />

                        <span>

                            {task}

                        </span>

                    </label>

                ))

            }

        </div>

    )

}