export enum AuthMethods {
  Session,
  WebId,
}

export interface IAuth {
  methods: Array<AuthMethods>;
}
