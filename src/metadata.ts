/* eslint-disable */
export default async () => {
    const t = {
        ["./photos/dto/photoDto"]: await import("./photos/dto/photoDto"),
        ["./photos/photos.schema"]: await import("./photos/photos.schema"),
        ["./category/category.schema"]: await import("./category/category.schema")
    };
    return { "@nestjs/swagger": { "models": [], "controllers": [[import("./app.controller"), { "AppController": { "home": {} } }], [import("./users/users.controller"), { "UsersController": { "register": { type: Object } } }], [import("./auth/auth.controller"), { "AuthController": { "login": {} } }], [import("./photos/photos.controller"), { "PhotosController": { "uploadPhoto": { type: t["./photos/dto/photoDto"].PhotoDto }, "getUserPhotos": { type: [t["./photos/dto/photoDto"].PhotoDto] }, "allApprovedPhoto": { type: [t["./photos/dto/photoDto"].PhotoDto] }, "getPendingPhotos": { type: [t["./photos/dto/photoDto"].PhotoDto] }, "approvePhoto": { type: t["./photos/photos.schema"].Photo }, "rejectPhoto": { type: t["./photos/photos.schema"].Photo } } }], [import("./category/category.controller"), { "CategoryController": { "CreateCategory": { type: t["./category/category.schema"].Category }, "getAllCategories": { type: [t["./category/category.schema"].Category] }, "updateCategory": { type: t["./category/category.schema"].Category }, "deleteCategory": { type: t["./category/category.schema"].Category } } }]] } };
};