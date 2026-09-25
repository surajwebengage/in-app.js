

/* =========================================================
   QUESTIONS
========================================================= */

const qs = [

    [
        "Question1_NPS",

        "How likely is it that you would recommend ACT Fibernet to your friends or family?",

        [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10"
        ],

        1
    ],


    [
        "Question2_Reason",

        "Reason for rating",

        [],

        2
    ],


    [
        "Question3_Satisfaction",

        "How satisfied are you using your ACT Fibernet connection?",

        [
            "Very Unsatisfied",
            "Somewhat Dissatisfied",
            "Neutral",
            "Somewhat Satisfied",
            "Very Satisfied"
        ],

        0
    ],


    [
        "Question4_Continue",

        "How likely would you be to continue using ACT Fibernet broadband in the next 1 year?",

        [
            "Most Unlikely",
            "Unlikely",
            "Neutral",
            "Likely",
            "Very Likely"
        ],

        0
    ],


    [
        "Question5_Disappointed",

        "How would you feel if you no longer get to utilize ACT Fibernet services?",

        [
            "Very Disappointed",
            "Somewhat Disappointed",
            "Not Disappointed"
        ],

        0
    ],


    [
        "Question6_Service",

        "Service",

        [
            "1 - Very Bad",
            "2 - Bad",
            "3 - Neither Good Nor Bad",
            "4 - Good",
            "5 - Very Good"
        ],

        0
    ],


    [
        "Question7_CustomerService",

        "Customer Service",

        [
            "1 - Very Bad",
            "2 - Bad",
            "3 - Neither Good Nor Bad",
            "4 - Good",
            "5 - Very Good"
        ],

        0
    ],


    [
        "Question8_Pricing",

        "Pricing",

        [
            "1 - Very Bad",
            "2 - Bad",
            "3 - Neither Good Nor Bad",
            "4 - Good",
            "5 - Very Good"
        ],

        0
    ],


    [
        "Question9_Speed",

        "Speed",

        [
            "1 - Very Bad",
            "2 - Bad",
            "3 - Neither Good Nor Bad",
            "4 - Good",
            "5 - Very Good"
        ],

        0
    ],


    [
        "Question10_Offers",

        "Attractive Offers (Gaming packs, ACT Stream TV 4K, Entertainment Packages)",

        [
            "1 - Very Bad",
            "2 - Bad",
            "3 - Neither Good Nor Bad",
            "4 - Good",
            "5 - Very Good"
        ],

        0
    ],


    [
        "Question11_TrustworthyBrand",

        "Trustworthy Brand that Keeps its Promises",

        [
            "1 - Very Bad",
            "2 - Bad",
            "3 - Neither Good Nor Bad",
            "4 - Good",
            "5 - Very Good"
        ],

        0
    ]

];


let r = {};

let i = 0;


const start =
    document.getElementById("start");

const next =
    document.getElementById("next");

const prev =
    document.getElementById("prev");
start.onclick = () => {
    document
        .getElementById("s0")
        .classList.remove("active");

    document
        .getElementById("q")
        .classList.add("active");

    load();

};

function load(){
    const x = qs[i];
    const a =
        document.getElementById("answers");
    document
        .getElementById("title")
        .textContent = x[1];
    document
        .getElementById("dots")
        .innerHTML =
        qs.map((_, n) =>

            `<i class="${
                n == i ? "on" : ""
            }"></i>`

        ).join("");

    if(i === qs.length - 1){

        next.textContent =
            r[x[0]]
                ? "SUBMIT"
                : "SKIP";

    }else{

        next.textContent =
            r[x[0]]
                ? "NEXT"
                : "SKIP";

    }


    if(x[3] === 2){

        a.innerHTML =

            `
            <textarea
                id="txt"
                rows="7"
                placeholder="Comment here"
            ></textarea>
            `;


        const txt =
            document.getElementById("txt");

        txt.value =
            r[x[0]] || "";


        txt.oninput = () => {

            r[x[0]] =
                txt.value.trim();


            if(i === qs.length - 1){

                next.textContent =
                    r[x[0]]
                        ? "SUBMIT"
                        : "SKIP";

            }else{

                next.textContent =
                    r[x[0]]
                        ? "NEXT"
                        : "SKIP";

            }

        };

    }

    else{

        const cls =
            x[3] === 1
                ? "nps"
                : "opts";


        a.innerHTML =

            `<div class="${cls}">` +

            x[2].map((v,index) => {

                const checked =
                    r[x[0]] === v
                        ? "checked"
                        : "";


                return `

                    <div class="radio-option">

                        <input
                            type="radio"
                            id="${x[0]}_${index}"
                            name="${x[0]}"
                            value="${v}"
                            ${checked}
                        >

                        <label for="${x[0]}_${index}">
                            ${v}
                        </label>

                    </div>

                `;

            }).join("") +

            "</div>" +


            (
                x[3] === 1

                    ?

                    `
                    <div class="labels">

                        <span>
                            Not at all likely
                        </span>

                        <span>
                            Extremely likely
                        </span>

                    </div>
                    `

                    :

                    ""

            );

        a.querySelectorAll(
                'input[type="radio"]'
            )
            .forEach(input => {
                input.addEventListener(
                    "change",
                    function(){
                        r[x[0]] =
                            this.value;
                        next.textContent =
                            i === qs.length - 1
                                ? "SUBMIT"
                                : "NEXT";

                    }
                );

            });

    }

}

next.onclick = () => {
    if(i < qs.length - 1){
        i++;
        load();
        return;

    }

    document
        .getElementById("q")
        .classList.remove("active");
    document
        .getElementById("end")
        .classList.add("active");

    console.log(
        "Final Responses:",
        r
    );

    try{

        weNotification.trackEvent(
            "feedback_form_submitted",
            JSON.stringify({
                "Question1_NPS":
                    r["Question1_NPS"] || "",
                "Question2_Reason":
                    r["Question2_Reason"] || "",
                "Question3_Satisfaction":
                    r["Question3_Satisfaction"] || "",
                "Question4_Continue":
                    r["Question4_Continue"] || "",
                "Question5_Disappointed":
                    r["Question5_Disappointed"] || "",
                "Question6_Service":
                    r["Question6_Service"] || "",
                "Question7_CustomerService":
                    r["Question7_CustomerService"] || "",
                "Question8_Pricing":
                    r["Question8_Pricing"] || "",
                "Question9_Speed":
                    r["Question9_Speed"] || "",
                "Question10_Offers":
                    r["Question10_Offers"] || "",
                "Question11_TrustworthyBrand":
                    r["Question11_TrustworthyBrand"] || ""
            })
        );
        console.log(
            "Survey event tracked successfully"
        );
    }catch(e){
        console.log(
            "Survey event tracking failed:",
            e
        );
    }

};


prev.onclick = () => {
    if(i > 0){
        i--;
        load();
    }else{
        document
            .getElementById("q")
            .classList.remove("active");
        document
            .getElementById("s0")
            .classList.add("active");
    }
};
