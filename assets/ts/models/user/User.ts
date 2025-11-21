import JsonMappedModel from "assets/ts/helpers/JsonMappedModel.js";
import PermissionCollection from "assets/ts/models/permission/PermissionCollection";
import type Permission from "assets/ts/models/permission/Permission";

export default class User extends JsonMappedModel {

    static avatar_Attribute_name = 'avatar'
    static full_name_attribute_name = 'full_name'
    static email_attribute_name = 'email'
    static email_verified_attribute_name = 'email_verified'
    static permissions_attribute_name = 'permissions'

    #attributes = {
        [User.avatar_Attribute_name]: null,
        [User.full_name_attribute_name]: null,
        [User.email_attribute_name]: null,
        [User.email_verified_attribute_name]: false,
        [User.permissions_attribute_name]: PermissionCollection
    }

    constructor(data: any) {
        super(data);
        this.map(data, this.#attributes)
    }

    static getFullNameAttributeName() {
        return this.full_name_attribute_name
    }

    static getAvatarAttributeName() {
        return this.avatar_Attribute_name
    }

    static getEmailAttributeName() {
        return this.email_attribute_name
    }

    static getPermissionsAttributeName() {
        return this.permissions_attribute_name
    }

    getFullName() {
        return this.getAttribute(User.getFullNameAttributeName())
    }

    getEmail() {
        return this.getAttribute(User.getEmailAttributeName())
    }

    getAvatar() {
        return this.getAttribute(User.getAvatarAttributeName())
    }

    getPermissions() {
        return this.getAttribute(User.getPermissionsAttributeName())
    }

    isPermitted(permission: string) {
        const permissions = this.getPermissions()
        return Array.isArray(permissions) && permissions.some((userPermission: Permission) => userPermission.getName() === permission)
    }
}