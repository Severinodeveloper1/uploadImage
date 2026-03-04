import Api from './Api'
import SecureFileController from './SecureFileController'
import UserController from './UserController'
import ProjectController from './ProjectController'
import ApiTokenController from './ApiTokenController'
import Settings from './Settings'
const Controllers = {
    Api: Object.assign(Api, Api),
SecureFileController: Object.assign(SecureFileController, SecureFileController),
UserController: Object.assign(UserController, UserController),
ProjectController: Object.assign(ProjectController, ProjectController),
ApiTokenController: Object.assign(ApiTokenController, ApiTokenController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers