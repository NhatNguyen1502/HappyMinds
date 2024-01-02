
document.getElementById('categoryFood').addEventListener('click', () => {
    let select = document.getElementById('categorySelection');
    select.size = (select.size === 1) ? select.options.length : 1;
    select.focus();
})
function renderFoodList(food) {
    let content = '';
    food.forEach(
        (element) =>
            (content += `
      <div class="card card-content mb-3 rounded-4">
          <div class="row g-0 justify-content-start">
            <div class="col-lg-2 d-flex justify-content-center justify-content-lg-start align-items-center text-center">
              <div class="custom-image " style="width: 200px;height: 150px; overflow: hidden;">
                <img src="${element.img}" class="img-fluid rounded-image mx-3 mt-2" alt="error"
                  style="width: 200px;height: 150px; overflow: hidden;">
              </div>
            </div>

            <div class="col-lg-6">
              <div class="card-body card-body-text px-0 text-center text-lg-start ">
                <h5 class="card-title">${element.name}</h5>
                <p class="card-text">${element.description}</p>
                <p class="card-text">
                  <medium class="text-body-secondary">${element.calo}
                    calo</medium>
                </p>
              </div>
            </div>
            <div class="col-lg-4 d-flex justify-content-center align-items-center pb-lg-0 pb-3">
              <form action="/food" method="post">
                <input type="hidden" name="idFood" value="${element._id}">
                <input type="hidden" name="emailUser" value="{{email}}">
                <button type="submit" class="btn btn-custom text-light bg-danger w-100 fw-medium rounded-3"
                  onclick="checkLoginFood('{{isLogin}}')">Add to Menu</button>
              </form>
            </div>
          </div>
        </div>
    `),
    );
    document.querySelector('#foodlist').innerHTML = content;
}
async function renderResultSearch() {
    keyword = document.querySelector('#search').value;
    await axios.get(`food/search?keyword=${keyword}`).then((res) => {
        console.log(res.data);
        renderFoodList(res.data.foods);
    });
}
