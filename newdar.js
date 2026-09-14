 * {
        box-sizing: border-box;
    }

    html, body {
        margin: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        font-family: Tajawal, "Inter", Arial, sans-serif;
    }

    .n-preview-close {
        z-index: 999999999;
    }

    .n-preview-img-wrapper {
        height: 100% !important;
        max-height: 100%;
        width: 100%;
        margin: 0;
    }

    /* ---------- shell ---------- */

    .main {
        /* Fills the WebEngage preview's own wrapper (.n-preview-img-wrapper above)
           via normal in-flow sizing, rather than a fixed/viewport-anchored overlay
           - the preview harness renders this content inside its own frame, so
           position:fixed here would escape that frame instead of filling it. */
        position: relative;
        width: 100%;
        height: 100vh;
        border: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background: #090b0ed9;
        color: #fff;
    }

    .s {
        position: absolute;
        inset: 0;
        display: none;
    }

    .s.on {
        display: flex;
    }

    /* ---------- wheel screen ---------- */

    #wS {
        flex-direction: column;
        align-items: center;
        padding-top: 48px;
    }

    .ttl {
        margin: 0;
        font-size: 26px;
        font-weight: 800;
        text-align: center;
        padding: 0 24px;
    }

    .sub {
        margin: 8px 0 0;
        font-size: 14px;
        font-weight: 400;
        color: #cfd8d4;
        text-align: center;
        padding: 0 24px;
        width: 75%;
    }

    .stage {
        position: relative;
        width: 235px;
        height: 235px;
        margin-top: 30px;
    }

    .pin {
        position: absolute;
        z-index: 7;
        left: 50%;
        top: -24px;
        transform: translateX(-50%);
        width: 18px;
        height: 53px;
        background: #b11158;
        clip-path: polygon(50% 0, 100% 9%, 82% 52%, 57% 100%, 43% 100%, 18% 52%, 0 9%);
        border-radius: 9px;
    }

    .pin:after {
        content: "";
        position: absolute;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #b7e0d1;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
    }

    #weSpinWheel {
        /*Don't change the id as the spin the wheel functionality is based on this id*/
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: #155846;
        padding: 12px;
        transition: transform 5s cubic-bezier(0.12, 0.72, 0.1, 1);
    }

    .face {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: inset 0 0 0 2px #155846;
    }

    .l {
        position: absolute;
        z-index: 2;
        left: 50%;
        top: 50%;
        width: 74px;
        text-align: center;
        font-weight: 700;
        line-height: 1.15;
        font-size: 13px;
    }

    .hub {
        position: absolute;
        z-index: 4;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #b11158;
        border: 3px solid #8e1649;
    }

    .hub:before,
    .hub:after {
        content: "";
        position: absolute;
        inset: 11px;
        border: 2px solid #79123f99;
        transform: rotate(45deg);
    }

    .hub:after {
        inset: 17px;
    }

    .dots {
        position: absolute;
        inset: 0;
        z-index: 3;
    }

    .dot {
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #b7e0d1;
        left: calc(50% - 3px);
        top: calc(50% - 3px);
        transform: rotate(var(--r)) translateY(-111.5px);
        transform-origin: 3px 3px;
    }

    .hint {
        margin-top: 22px;
        color: #cfd8d4;
        font-size: 13px;
    }

    /* ---------- buttons (shared) ---------- */

    button.spin-button,
    button.respin-button {
        margin-top: 10px;
        height: 44px;
        min-width: 150px;
        padding: 0 22px;
        border: 0;
        border-radius: 22px;
        background: #3c9079;
        color: #fff;
        font-size: 16px;
        font-family: inherit;
        font-weight: 700;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    button.spin-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    button.spin-button:focus-visible,
    button.respin-button:focus-visible {
        outline: none !important;
    }

    a.continue-link {
        margin-top: 12px;
        height: 40px;
        min-width: 150px;
        padding: 0 22px;
        border-radius: 22px;
        border: 1.5px solid #ffffff55;
        color: #fff;
        background: transparent;
        font-size: 15px;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
    }

    /* ---------- result sheets ---------- */

    #rS,
    #lS {
        align-items: flex-end;
        justify-content: center;
        background: #090b0eaa;
    }

    .sheet {
        position: relative;
        width: calc(100vw - 6px);
        max-width: 430px;
        min-height: 356px;
        background: #fff;
        border-radius: 18px 18px 0 0;
        color: #1c4a3f;
        padding: 24px 28px 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .con {
        margin: 0;
        color: #961a4d;
        font-size: 26px;
        font-weight: 800;
        text-align: center;
    }

    .won {
        margin: 6px 0 0;
        font-size: 15px;
        color: #475467;
        text-align: center;
    }

    /* ---------- win: gift box graphic ---------- */

    .gift {
        position: relative;
        width: 150px;
        height: 154px;
        margin-top: 18px;
    }

    .bow {
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        width: 86px;
        height: 40px;
    }

    .bow:before,
    .bow:after {
        content: "";
        position: absolute;
        width: 37px;
        height: 20px;
        border: 7px solid #d0c0ae;
        border-radius: 50%;
        top: 1px;
    }

    .bow:before {
        left: 3px;
        transform: rotate(18deg);
    }

    .bow:after {
        right: 3px;
        transform: rotate(-18deg);
    }

    .rib {
        position: absolute;
        top: 37px;
        left: 50%;
        transform: translateX(-50%);
        width: 7px;
        height: 28px;
        background: #d0c0ae;
    }

    .box {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 116px;
        height: 114px;
        border: 4px solid #194a3e;
        border-radius: 10px;
        background-color: #0d6048;
        background-image: linear-gradient(45deg, transparent 43%, #a71b53 43% 54%, transparent 54%),
            linear-gradient(-45deg, transparent 43%, #a71b53 43% 54%, transparent 54%);
        background-size: 19px 19px;
        display: grid;
        place-items: center;
    }

    .inner {
        width: 90px;
        height: 70px;
        background: #15523f;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-weight: 700;
        font-size: 15px;
        line-height: 1.15;
        overflow: hidden;
        padding: 4px;
    }

    /* ---------- win: coupon code ---------- */

    .code {
        margin-top: 16px;
        color: #3c9079;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 0.5px;
    }

    .copy {
        margin-top: 10px;
        min-width: 130px;
        height: 34px;
        padding: 0 18px;
        border: 0;
        border-radius: 18px;
        background: #b11158;
        color: #fff;
        font-size: 14px;
        font-family: inherit;
        font-weight: 700;
        cursor: pointer;
    }

    .ok {
        margin-top: 6px;
        font-size: 12px;
        color: #3c9079;
        opacity: 0;
        transition: opacity 0.2s linear;
    }

    .ok.on {
        opacity: 1;
    }

    .sheet-actions {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }

    .sheet-actions a.continue-link {
        border: 1.5px solid #1c4a3f33;
        color: #1c4a3f;
    }

    /* ---------- lose: face icon ---------- */

    .sadface {
        margin-top: 18px;
    }
