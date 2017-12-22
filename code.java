public class BankAccount {
  b+privateb- int balance = 0;
  b+privateb- final String name;

  public BankAccount(String name) {
    this.name = name;
  }

  public void deposit(int value) {
    this.balance += value;
  }

  public void withdraw(int value) {
    this.balance -= value;
  }

  public int getBalance() {
    return this.balance;
  }
}
