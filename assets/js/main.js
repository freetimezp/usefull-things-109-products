document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("container");
    const modal = document.querySelector(".modal");
    const modalCloseBtn = document.querySelector(".close-btn");
    const productImg = document.querySelector(".product-img img");
    const productName = document.querySelector(".product-name");
    const modalProductName = document.querySelector(".modal .product-name h1");
    const modalProductInfo = document.querySelector(".modal .product-name p");

    const boxCount = 21 * 12;
    const boxSize = 240;
    const totalImages = 18;
    const columns = 21;

    const products = [
        {
            info: "Lorem ipsum text here.",
            name: "Title & 1",
        },
        {
            info: "Lorem ipsum text here.",
            name: "Title & 2",
        },
        {
            info: "Lorem ipsum text here.",
            name: "Title & 3",
        },
        {
            info: "Lorem ipsum text here.",
            name: "Title & 4",
        },
        {
            info: "Lorem ipsum text here.",
            name: "Title & 5",
        },
        {
            info: "Lorem ipsum text here.",
            name: "Title & 6",
        },
        {
            info: "Lorem ipsum text here.",
            name: "Title & 7",
        },
        {
            info: "Lorem ipsum text here.",
            name: "Title & 8",
        },
        {
            info: "Lorem ipsum text here.",
            name: "Title & 9",
        },
        {
            info: "Lorem ipsum text here.",
            name: "Title & 10",
        },
        {
            info: "Lorem ipsum text here.",
            name: "Title & 11",
        },
        {
            info: "Lorem ipsum text here.",
            name: "Title & 12",
        },
        {
            info: "Lorem ipsum text here.",
            name: "Title & 13",
        },
        {
            info: "Lorem ipsum text here.",
            name: "Title & 14",
        },
        {
            info: "Lorem ipsum text here.",
            name: "Title & 15",
        },
        {
            info: "Lorem ipsum text here.",
            name: "Title & 16",
        },
        {
            info: "Lorem ipsum text here.",
            name: "Title & 17",
        },
        {
            info: "Lorem ipsum text here.",
            name: "Title & 18",
        },
    ];

    const containerWidth = columns * boxSize;
    container.style.width = containerWidth + "px";

    for (let i = 0; i < boxCount; i++) {
        const box = document.createElement("div");
        box.classList.add("box");

        const img = document.createElement("img");
        img.classList.add("img");
        const imageIndex = (i % totalImages) + 1;
        img.src = `./assets/images/img${imageIndex}.jpg`;

        const productIndex = i % products.length;
        const product = products[productIndex];

        const info = document.createElement("p");
        info.textContent = product.info;

        const name = document.createElement("h1");
        name.textContent = product.name;

        const content = document.createElement("div");
        content.classList.add("content");
        content.appendChild(info);
        content.appendChild(name);

        box.appendChild(img);
        box.appendChild(content);
        container.appendChild(box);

        let isDragging = false;
        let isClicking = false;

        box.addEventListener("mousedown", function () {
            isDragging = false;
            isClicking = true;
        });
        box.addEventListener("mousemove", function () {
            isDragging = true;
            isClicking = false;
        });
        box.addEventListener("click", function () {
            if (!isDragging && isClicking) {
                gsap.set(modal, { display: "flex" });
                gsap.to(modal, { opacity: 1, duration: 0.4 });

                productImg.src = img.src;
                modalProductName.textContent = product.name;
                modalProductInfo.textContent = product.info;
            }
        });
    }

    modalCloseBtn.addEventListener("click", function () {
        gsap.to(modal, {
            opacity: 0,
            duration: 0.4,
            onComplete: () => {
                gsap.set(modal, {
                    display: "none",
                });
            },
        });
    });

    let isContainerDragging = false;
    let startCoords = { x: 0, y: 0 };
    let startTranslate = { x: 0, y: 0 };

    container.addEventListener("mousedown", onDragStart);
    container.addEventListener("mouseup", onDragEnd);
    container.addEventListener("mouseleave", onDragEnd);
    container.addEventListener("mousemove", onDrag);

    function onDragStart(e) {
        isContainerDragging = true;
        startCoords.x = e.clientX;
        startCoords.y = e.clientY;
        startTranslate.x = gsap.getProperty(container, "x");
        startTranslate.y = gsap.getProperty(container, "y");

        gsap.set(container, { cursor: "grabbing" });
        gsap.set(container, { userSelect: "none" });
    }

    function onDragEnd() {
        if (!isContainerDragging) return;
        isContainerDragging = false;

        gsap.set(container, { cursor: "grab" });
        gsap.set(container, { userSelect: "none" });
    }

    function onDrag(e) {
        if (!isContainerDragging) return;
        e.preventDefault();

        const deltaX = e.clientX - startCoords.x;
        const deltaY = e.clientY - startCoords.y;

        const translateX = startTranslate.x + deltaX;
        const translateY = startTranslate.y + deltaY;

        gsap.to(container, {
            x: translateX,
            y: translateY,
            duration: 0.5,
            ease: "power1.out",
        });
    }
});
