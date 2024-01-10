document.getElementById('categoryFood').addEventListener('click', () => {
    let select = document.getElementById('categorySelection');
    select.size = select.size === 1 ? select.options.length : 1;
    select.focus();
});

function renderFoods(foods) {
    let content = '';
    foods.forEach(
        (element) =>
            (content += `
          <div class="rowTbl d-flex justify-content-start p-0 mb-1 text-center">
          <div class="iconHeart d-flex align-items-center justify-content-center p-0" id="iconHeart" style="width: 45px; background-color: rgb(178, 178, 178); border-radius: 10px 0px 0px 10px;">
            <i class="bi bi-suit-heart fs-4 p-0 px-2" id="emptyHeart"></i>
          </div>
          <div class="cellTbl d-flex align-items-center justify-content-center p-2">${element.name}</div>
          <div class="cellTbl d-flex align-items-center justify-content-center">
            <img src="${element.img}" class="" alt="image food"
                style="width: 90px; height: 90px; overflow: hidden;">
          </div>
          <div class="cellTbl d-flex align-items-center justify-content-center">${element.calo}</div>
          <div class="cellTbl d-flex align-items-center justify-content-center">${element.category}</div>
          <div class="cellTbl d-flex align-items-center justify-content-start ps-3 ipWeight">
            <input class="rounded-3" placeholder="Nhập số" type="text" style="width: 100px; border: none; outline: none; background-color:  #e7e7e7; "> <span>gam</span> 
          </div>
          <div class="cellTbl lastCell d-flex align-items-center justify-content-center">
            <form action="/food" method="post">
              <input type="hidden" name="idFood" value="${element._id}">
              <input type="hidden" name="emailUser" value="{{email}}">
              <button class="border-0" type="submit" style="background-color: white;" onclick="checkLoginFood('{{isLogin}}')">
                <i class="bi bi-plus-square-fill fs-4" style="color: rgba(253, 0, 84, 1);"></i>
              </button>
            </form>
            
          </div>
        </div>
  `),
    );
    document.querySelector('#foodList').innerHTML = content;
}
// function renderFoodList(food) {
//     let content = '';
//     food.forEach(
//         (element) =>
//             (content += `
//             <div class="rowTbl d-flex justify-content-start p-0 mb-1 text-center">
//             <div class="iconHeart d-flex align-items-center justify-content-center p-0" id="iconHeart" style="width: 45px; background-color: rgb(178, 178, 178); border-radius: 10px 0px 0px 10px;">
//               <i class="bi bi-suit-heart fs-4 p-0 px-2" id="emptyHeart"></i>
//             </div>
//             <div class="cellTbl d-flex align-items-center justify-content-center p-2">${element.name}</div>
//             <div class="cellTbl d-flex align-items-center justify-content-center">
//               <img src="${element.img}" class="" alt="image food"
//                   style="width: 90px; height: 90px; overflow: hidden;">
//             </div>
//             <div class="cellTbl d-flex align-items-center justify-content-center">${element.calo}</div>
//             <div class="cellTbl d-flex align-items-center justify-content-center">${element.category}</div>
//             <div class="cellTbl d-flex align-items-center justify-content-start ps-3 ipWeight">
//               <input class="rounded-3" placeholder="Nhập số" type="text" style="width: 100px; border: none; outline: none; background-color:  #e7e7e7; "> <span>gam</span>
//             </div>
//             <div class="cellTbl lastCell d-flex align-items-center justify-content-center">
//               <form action="/food" method="post">
//                 <input type="hidden" name="idFood" value="${element._id}">
//                 <input type="hidden" name="emailUser" value="{{email}}">
//                 <button class="border-0" type="submit" style="background-color: white;" onclick="checkLoginFood('{{isLogin}}')">
//                   <i class="bi bi-plus-square-fill fs-4" style="color: rgba(253, 0, 84, 1);"></i>
//                 </button>
//               </form>

//             </div>
//           </div>
//     `),
//     );
//     document.querySelector('#foodList').innerHTML = content;
// }
async function renderResultSearch() {
    keyword = document.querySelector('#search').value;
    await axios.get(`food/search?keyword=${keyword}`).then((res) => {
        renderFoods(res.data.foods);
    });
}

//Panigation
document
    .getElementById('currentPage_btn_right')
    .addEventListener('click', async function () {
        const currentValue = parseInt(getBeforeSlashValue());
        let nextPage;

        if (currentValue >= parseInt(getAfterSlashValue())) {
            addToValueBeforeSlash(parseInt(getAfterSlashValue()));
        } else {
            try {
                nextPage = currentValue + 1;
                const response = await axios.get(
                    `food/showPanigation?page=${nextPage}`,
                );
                renderFoods(response.data.foods);
                addToValueBeforeSlash(nextPage);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    });

document
    .getElementById('currentPage_btn_left')
    .addEventListener('click', async function () {
        const currentValue = parseInt(getBeforeSlashValue());
        let prevPage;

        if (currentValue <= 1) {
            addToValueBeforeSlash(1);
        } else {
            try {
                prevPage = currentValue - 1;
                const response = await axios.get(
                    `food/showPanigation?page=${prevPage}`,
                );
                renderFoods(response.data.foods);
                addToValueBeforeSlash(prevPage);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    });

function addToValueBeforeSlash(newValue) {
    const mySpan = document.getElementById('panigation');
    const parts = mySpan.innerText.split('/');
    parts[0] = newValue;
    mySpan.innerText = parts.join('/');
}

function getBeforeSlashValue() {
    const mySpan = document.getElementById('panigation');
    return parseInt(mySpan.innerText.split('/')[0]);
}

function getAfterSlashValue() {
    const mySpan = document.getElementById('panigation');
    return parseInt(mySpan.innerText.split('/')[1]);
}
