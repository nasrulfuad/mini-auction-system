
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateDonationInput {
    count: number;
    displayName: string;
    email: string;
    mobile?: Nullable<string>;
    team?: Nullable<string>;
    message?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
}

export class DonationQueries {
    field?: Nullable<string>;
    direction?: Nullable<string>;
    cursor?: Nullable<string>;
}

export class Donation {
    id: string;
    count: number;
    displayName: string;
    email: string;
    mobile?: Nullable<string>;
    team?: Nullable<string>;
    message?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
}

export abstract class IQuery {
    abstract donations(queries?: Nullable<DonationQueries>): Nullable<DonationQueryResult> | Promise<Nullable<DonationQueryResult>>;

    abstract donation(id: string): Nullable<Donation> | Promise<Nullable<Donation>>;

    abstract totalDonations(): number | Promise<number>;
}

export abstract class IMutation {
    abstract createDonation(createDonationInput: CreateDonationInput): Donation | Promise<Donation>;
}

export class DonationQueryResult {
    items?: Nullable<Nullable<Donation>[]>;
    cursor?: Nullable<string>;
}

export class SubscriptionTotalUpdatedResult {
    total: number;
}

export abstract class ISubscription {
    abstract totalUpdated(): Nullable<SubscriptionTotalUpdatedResult> | Promise<Nullable<SubscriptionTotalUpdatedResult>>;
}

export type DateTime = any;
type Nullable<T> = T | null;
