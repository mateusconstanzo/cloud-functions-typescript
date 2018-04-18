import { firestore } from "firebase-admin";

import {
    Service,
    Inject,
} from "typedi";

import {
    User,
    UserEntity
} from "./model"

import { UserRepository } from "./repository";
import { UserNotFoundError } from "./error"

@Service()
export class UserService {

    @Inject()
    userRepository: UserRepository;

    async findAll(): Promise<UserEntity[]> {

        const query = await this.userRepository.findAll();

        const users = new Array<UserEntity>()

        query.forEach((document) => {

            const doc = document.data();

            users.push(
                new UserEntity(doc.id, doc.username, doc.password)
            );

        });

        return users;
    }

    async findById(id: string): Promise<UserEntity> {

        const document = await this.find(id);

        const data = document.data();

        return new UserEntity(data.id, data.username, data.password);

    }

    async save(user: User): Promise<UserEntity> {

        const id = await this.userRepository.save(
            user.username,
            user.password
        );

        return new UserEntity(id, user.username, user.password);
    }

    async update(id: string, user: User): Promise<UserEntity> {

        await this.userRepository.update(
            id,
            user.username,
            user.password
        );

        return new UserEntity(id, user.username, user.password);
    }

    async delete(id: string): Promise<void> {

        await this.find(id);

        return this.userRepository.delete(id);
    }

    private async find(id: string): Promise<firestore.DocumentSnapshot> {

        const document = await this.userRepository.findById(id);

        if (!document.exists)
            throw new UserNotFoundError();

        return document;
    }

}