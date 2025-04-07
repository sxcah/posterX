<?php
include "api/get-user.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Poster:X HUB</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="page-wrapper">
        <div class="main-wrapper">
            <div class="main-content">
                <div class="hero-section">
                    <div class="hero-title">Welcome <u><?php echo htmlspecialchars($username); ?></u> to PosterX</div>
                    <div class="hero-text"><b><u>PosterX</u> is a</b>, sit amet consectetur adipisicing elit.
                        Tenetur, dolore. Cum error unde deserunt tenetur deleniti, numquam ea.
                        Cum omnis facere, magnam ipsam culpa soluta commodi qui asperiores quod consequatur?
                    </div>
                </div>
                <div class="account-section">
                    <?php if(isset($_SESSION["username"])): ?>
                        <a href="api/logout_user.php" class="account-link">
                            <div class="account-content">
                                <p class="account-text">Log out</p>
                            </div>
                        </a>
                    <?php else: ?>
                        <a href="forms/login.html" class="account-link">
                            <div class="account-content">
                                <p class="account-text">Log in</p>
                            </div>
                        </a>
                        <a href="forms/register.html" class="account-link">
                            <div class="account-content">
                                <p class="account-text">Create Account</p>
                            </div>
                        </a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</body>
</html>