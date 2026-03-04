import StorageApiController from './StorageApiController'
import BucketApiController from './BucketApiController'
const V1 = {
    StorageApiController: Object.assign(StorageApiController, StorageApiController),
BucketApiController: Object.assign(BucketApiController, BucketApiController),
}

export default V1