$(document).ready(function() {

    $('a[href^="#"]').on('click', function(e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        const $form = $(this);
        
        const formData = {
            name: $form.find('input[type="text"]').val().trim(),
            email: $form.find('input[type="email"]').val().trim(),
            phone: $form.find('input[type="tel"]').val().trim(),
            message: $form.find('textarea').val().trim()
        };

        $form.find('.form-control').removeClass('is-invalid is-valid');

        let isValid = true;
        
        if (!formData.name) {
            $form.find('input[type="text"]').addClass('is-invalid');
            isValid = false;
        } else {
            $form.find('input[type="text"]').addClass('is-valid');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            $form.find('input[type="email"]').addClass('is-invalid');
            isValid = false;
        } else {
            $form.find('input[type="email"]').addClass('is-valid');
        }
        if (!formData.message) {
            $form.find('textarea').addClass('is-invalid');
            isValid = false;
        } else {
            $form.find('textarea').addClass('is-valid');
        }
        if (!isValid) {
            if (!$('.alert-danger').length) {
                $form.prepend('<div class="alert alert-danger alert-dismissible fade show" role="alert">Пожалуйста, заполните все обязательные поля корректно!<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>');
            }
            return;
        }
        const $submitBtn = $form.find('.btn-submit');
        const originalText = $submitBtn.text();
        
        $submitBtn.addClass('sent');
        $submitBtn.text('Отправлено!');
        $submitBtn.prop('disabled', true);

        setTimeout(() => {
            $form[0].reset();
            $form.find('.form-control').removeClass('is-valid');
            $submitBtn.removeClass('sent');
            $submitBtn.text(originalText);
            $submitBtn.prop('disabled', false);
        }, 3000);
    });

});
