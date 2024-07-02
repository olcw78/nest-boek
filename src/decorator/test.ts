function decoratorFac(val: string) {
  console.log('decorator evaluated');

  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    console.log(val);
  };
}

class TestClass {
  @decoratorFac('Hello')
  test() {
    console.log('test called');
  }
}

new TestClass().test();

console.log();

function first() {
  console.log(`first(): factory evaluated`);
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    console.log(`first(): called`);
  };
}

function second() {
  console.log(`second(): factory evaluated`);
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    console.log(`second(): called`);
  };
}

class DecoratorOrderTest {
  @first()
  @second()
  method() {
    console.log('method is called()');
  }
}

new DecoratorOrderTest().method();

console.log();

function reportableClassDecorator<T extends { new (...args: any[]): object }>(
  ctor: T,
) {
  return class extends ctor {
    reportingURL = 'http://www.example.com';
  };
}

@reportableClassDecorator
class BugReport {
  type = 'report';

  public constructor(readonly title: string) {}
}

const bugReport = new BugReport('callstack overflow');
console.log(bugReport);
console.log();

function HandleError() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);

    const method = descriptor.value;

    descriptor.value = function () {
      try {
        method();
      } catch (error) {
        console.error(error);
      }
    };
  };
}

class Greeter {
  @HandleError()
  hello() {
    throw new Error(`test error`);
  }
}

new Greeter().hello();
console.log();

function Enumerable(isEnumerable: boolean) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.enumerable = isEnumerable;
  };
}

class Person {
  constructor(private name: string) {}

  @Enumerable(true)
  get getName() {
    return this.name;
  }

  @Enumerable(false)
  set setName(val: string) {
    this.name = val;
  }
}

const person = new Person('Dexter');
for (const k in person) {
  console.log(`${k}: ${person[k]}`);
}
console.log();
