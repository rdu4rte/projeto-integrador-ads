export interface DefaultUseCase<Input, Output> {
  perform(input: Input): Output | Promise<Output>
}
