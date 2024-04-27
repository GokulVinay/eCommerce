# Update the UserManager class to store the CAPTCHA for each registered user
class UserManager:
    def __init__(self):
        self.users = {}

    def register_user(self, username, password, captcha):
        if username in self.users:
            return False  # User already exists
        else:
            self.users[username] = {'password': password, 'captcha': captcha}
            return True  # User registered successfully

    def get_user_captcha(self, username):
        return self.users.get(username, {}).get('captcha', None)


# Update the login process to validate the provided CAPTCHA against the one stored during registration
# Simulate registration form submission with CAPTCHA verification
username = input("Enter username: ")
password = input("Enter password: ")
provided_captcha = input("Enter CAPTCHA: ")

# Retrieve the CAPTCHA generated during registration
stored_captcha = user_manager.get_user_captcha(username)

if stored_captcha and provided_captcha.lower() == stored_captcha.lower():
    if user_manager.authenticate_user(username, password):
        print("Login successful!")
        # Now the user is logged in, they can add a product
        product_name = input("Enter product name: ")
        product_price = float(input("Enter product price: "))
        product_image = input("Enter product image: ")
        product_quantity = int(input("Enter product quantity: "))
        product_manager.add_product(product_name, product_price, product_image, product_quantity)
    else:
        print("Login failed.")
else:
    print("CAPTCHA verification failed. Please try again.")



    
